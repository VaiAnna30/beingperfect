import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { companyRequirements, topicBank } from '../companyData';
import { 
  ArrowLeft, Loader2, Trophy, AlertTriangle, CheckCircle2, 
  BookOpen, ExternalLink, Activity, ChevronRight, Settings, 
  RefreshCw, Zap, Flame 
} from 'lucide-react';

const Dashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { username, company } = location.state || { username: "vai_ANNA_3003", company: "Amazon" };
  const target = companyRequirements[company] || companyRequirements["Amazon"];

  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [contestData, setContestData] = useState(null);
  const [skillStats, setSkillStats] = useState([]);
  const [error, setError] = useState(null);
  const [privacyWarning, setPrivacyWarning] = useState(false);

  const fetchRealData = async () => {
    setLoading(true);
    setError(null);
    setPrivacyWarning(false);
    try {
      // Robust Proxy Fetching
      const fetchApi = async (url) => {
        const proxy = `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`;
        const res = await fetch(proxy);
        if (!res.ok) throw new Error("Sync Gateway Busy");
        return await res.json();
      };

      const solved = await fetchApi(`https://alfa-leetcode-api.onrender.com/${username}/solved`);
      const contest = await fetchApi(`https://alfa-leetcode-api.onrender.com/${username}/contest`);
      const skill = await fetchApi(`https://alfa-leetcode-api.onrender.com/${username}/skill`);
      
      setUserData(solved);
      setContestData(contest);
      
      const tags = skill?.data?.matchedUser?.tagProblemCounts;
      if (!tags || (tags.advanced.length === 0 && tags.intermediate.length === 0)) {
          setPrivacyWarning(true);
      } else {
          setSkillStats([...(tags.advanced || []), ...(tags.intermediate || []), ...(tags.fundamental || [])]);
      }
    } catch (e) { 
      setError("Failed to sync LeetCode data. Please check your username."); 
    } finally { 
      setLoading(false); 
    }
  };

  useEffect(() => { fetchRealData(); }, [username]);

  if (loading) return <LoadingScreen />;
  if (error) return <ErrorScreen error={error} retry={fetchRealData} navigate={navigate} />;

  // --- RATING LOGIC ---
  // If user has a real contest rating, use it. Otherwise, use the Estimated Rating (2671).
  const realRating = contestData?.contestRating ? Math.round(contestData.contestRating) : 2671;
  const ratingProgress = Math.min((realRating / target.targetRating) * 100, 100);
  const totalScore = Math.round((ratingProgress * 0.7) + (Math.min((userData?.mediumSolved / target.minMedium) * 100, 100) * 0.3));

  // --- FALLBACK LOGIC: RECOVERY PLAN OR MUST-DO QUESTIONS ---
  const recoveryPlan = (target.tags || target.requiredTags || ["Array", "String", "Dynamic Programming"]).map(tag => {
    const found = skillStats.find(t => 
        t.tagName.toLowerCase().includes(tag.toLowerCase()) || 
        tag.toLowerCase().includes(t.tagName.toLowerCase())
    );
    const solved = found ? found.problemsSolved : 0;
    // Use the stored topicBank questions as the recommended list
    const recommendedQuestions = topicBank[tag] || (topicBank["Array"] ? topicBank["Array"].slice(0, 10) : []);
    
    return { tag, solved, questions: recommendedQuestions };
  });

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-white p-6 md:p-12 font-sans">
      <div className="max-w-6xl mx-auto">
        <header className="flex justify-between items-center mb-10">
            <button onClick={() => navigate('/')} className="flex items-center gap-2 text-gray-500 hover:text-white cursor-pointer"><ArrowLeft size={20}/> New Search</button>
            <div className="text-right">
                <h1 className="text-2xl font-bold text-[#6366f1]">{username}</h1>
                <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Global Rank: {contestData?.contestRanking || "N/A"}</p>
            </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Rating Section */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-[#16161a] p-8 rounded-3xl border border-gray-800 text-center shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-[#6366f1]"></div>
                <Trophy className="mx-auto text-yellow-500 mb-4" size={48} />
                <h2 className="text-gray-500 uppercase text-xs font-bold tracking-widest mb-1">User Skill Rating</h2>
                <div className="text-6xl font-black mb-2">{realRating}</div>
                <div className="text-xs font-bold text-[#6366f1] uppercase tracking-tighter">Level: Knight</div>
            </div>

            <div className="bg-[#16161a] p-6 rounded-2xl border border-gray-800">
               <h3 className="font-bold mb-4 flex items-center gap-2 text-sm"><Activity size={16} className="text-[#6366f1]" /> Solve Volume</h3>
               <div className="space-y-4">
                  <StatBar label="Mediums" count={userData?.mediumSolved} target={target.minMedium} color="bg-yellow-500" />
                  <StatBar label="Hards" count={userData?.hardSolved} target={target.minHard} color="bg-red-500" />
               </div>
            </div>
          </div>

          {/* Recovery Plan / Must Do Section */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-gradient-to-br from-indigo-950/30 to-[#16161a] p-8 rounded-3xl border border-gray-800 flex justify-between items-center shadow-lg">
                <div>
                    <h2 className="text-2xl font-bold mb-1">Target: {target.name}</h2>
                    <div className="text-5xl font-black">{totalScore}% <span className="text-lg font-normal text-gray-500">Ready</span></div>
                </div>
                <div className="w-20 h-20 rounded-full border-4 border-[#6366f1] flex items-center justify-center bg-[#0a0a0c]">
                    <CheckCircle2 className={`text-[#6366f1] ${totalScore >= 100 ? 'animate-pulse' : ''}`} size={40} />
                </div>
            </div>

            <div className="bg-[#16161a] p-8 rounded-3xl border border-gray-800">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-3"><BookOpen className="text-[#6366f1]" /> {privacyWarning ? "Must-Do Interview Questions" : "Personalized Recovery Plan"}</h3>
              
              {privacyWarning && (
                <div className="mb-8 p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl flex items-center gap-3">
                    <Settings className="text-amber-400" size={18} />
                    <p className="text-xs text-gray-400">Skill data is hidden. Showing standard high-frequency questions for {target.name} prep.</p>
                </div>
              )}

              <div className="space-y-12">
                {recoveryPlan.map((item, i) => (
                    <div key={i} className="relative pl-8 border-l-2 border-gray-800">
                        <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-[#6366f1]"></div>
                        <div className="flex justify-between items-center mb-6">
                            <h4 className="text-xl font-bold text-white">{item.tag} Mastery</h4>
                            {!privacyWarning && <span className="text-xs font-mono text-gray-500">Current Solved: <span className="text-white font-bold">{item.solved}</span></span>}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {item.questions.map((q, j) => (
                                <a key={j} href={`https://leetcode.com/problemset/all/?search=${q.title}`} target="_blank" rel="noreferrer" className="flex justify-between items-center p-4 bg-[#0a0a0c]/40 border border-gray-800 rounded-xl hover:border-[#6366f1] transition-all group">
                                    <span className="text-[11px] font-medium group-hover:text-[#6366f1] transition-colors">{q.title}</span>
                                    <div className="flex items-center gap-2">
                                        <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded uppercase ${q.difficulty === 'Hard' ? 'bg-red-500/20 text-red-400' : 'bg-yellow-500/20 text-yellow-400'}`}>{q.difficulty}</span>
                                        <ChevronRight size={14} className="text-gray-600" />
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Sub-components
const StatBar = ({ label, count, target, color }) => (
    <div className="space-y-1">
        <div className="flex justify-between text-[10px] font-bold uppercase text-gray-500"><span>{label}</span><span>{count} / {target}</span></div>
        <div className="w-full bg-[#0a0a0c] h-1.5 rounded-full overflow-hidden"><div className={`h-full ${color}`} style={{ width: `${Math.min((count/target)*100, 100)}%` }}></div></div>
    </div>
);

const LoadingScreen = () => (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0a0a0c] text-white space-y-4">
        <Loader2 className="w-12 h-12 text-[#6366f1] animate-spin" />
        <h2 className="text-xl font-bold animate-pulse tracking-widest">SYNCING GLOBAL DATA...</h2>
    </div>
);

const ErrorScreen = ({ error, retry, navigate }) => (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0a0a0c] text-white p-6 text-center">
        <AlertTriangle className="w-16 h-16 text-red-500 mb-6" />
        <h2 className="text-2xl font-bold text-red-500 mb-2">Sync Failed</h2>
        <p className="text-gray-400 mb-8">{error}</p>
        <div className="flex gap-4">
            <button onClick={() => navigate('/')} className="px-8 py-3 rounded-xl border border-gray-700 text-sm">Back</button>
            <button onClick={retry} className="px-8 py-3 bg-[#6366f1] rounded-xl font-bold flex items-center gap-2 text-sm"><RefreshCw size={18} /> Retry</button>
        </div>
    </div>
);

export default Dashboard;