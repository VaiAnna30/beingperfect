import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { companyRequirements, topicBank } from '../companyData';
import { 
  ArrowLeft, Loader2, Trophy, AlertTriangle, CheckCircle2, 
  BookOpen, Activity, ChevronRight, Settings, 
  RefreshCw 
} from 'lucide-react';

const Dashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { username, company } = location.state || { username: "vai_ANNA_3003", company: "Amazon" };
  const target = companyRequirements[company] || companyRequirements["Amazon"];

  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [contestData, setContestData] = useState({ rating: 1500, rank: "N/A" });
  const [skillStats, setSkillStats] = useState([]);
  const [error, setError] = useState(null);
  const [privacyWarning, setPrivacyWarning] = useState(false);

  const fetchRealData = async () => {
    setLoading(true);
    setError(null);
    setPrivacyWarning(false);
    
    try {
      // Dono APIs ke Base URLs
      const alfaApi = `https://alfa-leetcode-api.onrender.com`;
      const backupApi = `https://leetcode-stats-api.herokuapp.com`;

      // Parallel fetching (koi ek fail hua toh dusre block nahi honge)
      const [solvedRes, contestRes, skillRes] = await Promise.allSettled([
        fetch(`${alfaApi}/${username}/solved`).then(res => res.json()),
        fetch(`${alfaApi}/${username}/contest`).then(res => res.json()),
        fetch(`${alfaApi}/skillStats/${username}`).then(res => res.json())
      ]);

      // 1. Handle Profile / Solved Data (WITH BACKUP API LOGIC)
      if (solvedRes.status === 'fulfilled' && !solvedRes.value?.errors && solvedRes.value?.solvedProblem !== undefined) {
        setUserData(solvedRes.value);
      } else {
         // Agar Alfa API Vercel pe time out ho jaye, toh Backup API try karo
         try {
            const backupFetch = await fetch(`${backupApi}/${username}`);
            const backupData = await backupFetch.json();
            
            if (backupData.status === "success") {
                setUserData({
                    mediumSolved: backupData.mediumSolved,
                    hardSolved: backupData.hardSolved
                });
            } else {
                throw new Error("Backup API also failed");
            }
         } catch(e) {
            // Agar dono API fail ho jayein, tab bhi APP CRASH NAHI HOGI! Default values assign hongi.
            console.error("APIs failed due to Vercel timeout, loading dashboard with default values.");
            setUserData({ mediumSolved: 0, hardSolved: 0 });
            setPrivacyWarning(true);
         }
      }

      // 2. Handle Contest Data Safely
      if (contestRes.status === 'fulfilled' && contestRes.value?.contestRating) {
        setContestData({
          rating: Math.round(contestRes.value.contestRating),
          rank: contestRes.value.contestGlobalRanking || "N/A"
        });
      } else {
         setContestData({ rating: 1500, rank: "N/A" });
      }

      // 3. Handle Skill Stats Data Safely
      if (skillRes.status === 'fulfilled' && skillRes.value?.data?.matchedUser?.tagProblemCounts) {
        const tags = skillRes.value.data.matchedUser.tagProblemCounts;
        if (!tags.advanced?.length && !tags.intermediate?.length && !tags.fundamental?.length) {
          setPrivacyWarning(true);
        } else {
          setSkillStats([
            ...(tags.advanced || []), 
            ...(tags.intermediate || []), 
            ...(tags.fundamental || [])
          ]);
        }
      } else {
        setPrivacyWarning(true);
      }

    } catch (e) { 
      // Ab ye error screen pe tabhi aayega jab user ka internet hi band ho
      setError("Network issue detected. Please check your connection."); 
    } finally { 
      setLoading(false); 
    }
  };

  useEffect(() => { fetchRealData(); }, [username]);

  if (loading) return <LoadingScreen />;
  if (error) return <ErrorScreen error={error} retry={fetchRealData} navigate={navigate} />;

  // --- DYNAMIC RATING LOGIC ---
  const realRating = contestData.rating;
  let levelTitle = "Pupil";
  let levelColor = "text-[#6366f1]";
  let trophyColor = "text-gray-400";
  
  if (realRating >= 2150) {
      levelTitle = "Guardian"; levelColor = "text-red-500"; trophyColor = "text-red-500";
  } else if (realRating >= 1850) {
      levelTitle = "Knight"; levelColor = "text-yellow-500"; trophyColor = "text-yellow-500";
  } else if (realRating >= 1600) {
      levelTitle = "Specialist"; levelColor = "text-emerald-400"; trophyColor = "text-emerald-400";
  }

  const ratingProgress = Math.min((realRating / target.targetRating) * 100, 100);
  const mediumProgress = Math.min(((userData?.mediumSolved || 0) / target.minMedium) * 100, 100);
  const totalScore = Math.round((ratingProgress * 0.7) + (mediumProgress * 0.3));

  // --- BULLETPROOF FALLBACK LOGIC FIX FOR TAGS ---
  const recoveryPlan = (target.tags || target.requiredTags || ["Array", "String", "Dynamic Programming"]).map(tag => {
    const found = skillStats.find(t => 
        t.tagName.toLowerCase().includes(tag.toLowerCase()) || 
        tag.toLowerCase().includes(t.tagName.toLowerCase())
    );
    const solved = found ? found.problemsSolved : 0;
    
    // Exact match dhoondne ke liye improved logic
    const targetTag = tag.trim();
    let exactKey = Object.keys(topicBank).find(k => k.toLowerCase() === targetTag.toLowerCase());
    
    let recommendedQuestions = topicBank[exactKey] || topicBank[targetTag] || topicBank[targetTag.replace(/s$/, '')];
    
    if (!recommendedQuestions) {
        recommendedQuestions = [
            { title: `Top ${targetTag} Interview Questions`, difficulty: "Medium" },
            { title: `Essential ${targetTag} Algorithms`, difficulty: "Medium" },
            { title: `Advanced ${targetTag} Patterns`, difficulty: "Hard" }
        ];
    }
    
    return { tag, solved, questions: recommendedQuestions };
  });

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-white p-6 md:p-12 font-sans">
      <div className="max-w-6xl mx-auto">
        <header className="flex justify-between items-center mb-10">
            <button onClick={() => navigate('/')} className="flex items-center gap-2 text-gray-500 hover:text-white cursor-pointer transition-colors">
                <ArrowLeft size={20}/> New Search
            </button>
            <div className="text-right">
                <h1 className="text-2xl font-bold text-[#6366f1]">{username}</h1>
                <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">
                    Global Rank: {contestData.rank.toLocaleString()}
                </p>
            </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-[#16161a] p-8 rounded-3xl border border-gray-800 text-center shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-[#6366f1]"></div>
                <Trophy className={`mx-auto mb-4 ${trophyColor}`} size={48} />
                <h2 className="text-gray-500 uppercase text-xs font-bold tracking-widest mb-1">Live Skill Rating</h2>
                <div className="text-6xl font-black mb-2">{realRating}</div>
                <div className={`text-xs font-bold uppercase tracking-tighter ${levelColor}`}>
                    Level: {levelTitle}
                </div>
            </div>

            <div className="bg-[#16161a] p-6 rounded-2xl border border-gray-800">
               <h3 className="font-bold mb-4 flex items-center gap-2 text-sm"><Activity size={16} className="text-[#6366f1]" /> Solve Volume</h3>
               <div className="space-y-4">
                  <StatBar label="Mediums" count={userData?.mediumSolved || 0} target={target.minMedium} color="bg-yellow-500" />
                  <StatBar label="Hards" count={userData?.hardSolved || 0} target={target.minHard} color="bg-red-500" />
               </div>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <div className="bg-gradient-to-br from-indigo-950/30 to-[#16161a] p-8 rounded-3xl border border-gray-800 flex justify-between items-center shadow-lg">
                <div>
                    <h2 className="text-2xl font-bold mb-1">Target: {target.name || company}</h2>
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
                    <p className="text-xs text-gray-400">Skill tags hidden or API timeout on Vercel. Showing standard high-frequency questions for {company}.</p>
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
                                <a key={j} href={`https://leetcode.com/problemset/all/?search=${encodeURIComponent(q.title)}`} target="_blank" rel="noreferrer" className="flex justify-between items-center p-4 bg-[#0a0a0c]/40 border border-gray-800 rounded-xl hover:border-[#6366f1] transition-all group">
                                    <span className="text-[11px] font-medium group-hover:text-[#6366f1] transition-colors">{q.title}</span>
                                    <div className="flex items-center gap-2">
                                        <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded uppercase ${q.difficulty === 'Hard' ? 'bg-red-500/20 text-red-400' : 'bg-yellow-500/20 text-yellow-400'}`}>{q.difficulty}</span>
                                        <ChevronRight size={14} className="text-gray-600 group-hover:text-[#6366f1] transition-colors" />
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

const StatBar = ({ label, count, target, color }) => (
    <div className="space-y-1">
        <div className="flex justify-between text-[10px] font-bold uppercase text-gray-500"><span>{label}</span><span>{count} / {target}</span></div>
        <div className="w-full bg-[#0a0a0c] h-1.5 rounded-full overflow-hidden"><div className={`h-full ${color}`} style={{ width: `${Math.min((count/target)*100, 100)}%` }}></div></div>
    </div>
);

const LoadingScreen = () => (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0a0a0c] text-white space-y-4">
        <Loader2 className="w-12 h-12 text-[#6366f1] animate-spin" />
        <h2 className="text-xl font-bold animate-pulse tracking-widest">SYNCING LIVE DATA...</h2>
    </div>
);

const ErrorScreen = ({ error, retry, navigate }) => (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0a0a0c] text-white p-6 text-center">
        <AlertTriangle className="w-16 h-16 text-red-500 mb-6" />
        <h2 className="text-2xl font-bold text-red-500 mb-2">Sync Failed</h2>
        <p className="text-gray-400 mb-8 max-w-md">{error}</p>
        <div className="flex gap-4">
            <button onClick={() => navigate('/')} className="px-8 py-3 rounded-xl border border-gray-700 hover:bg-gray-800 transition-colors text-sm">Back</button>
            <button onClick={retry} className="px-8 py-3 bg-[#6366f1] hover:bg-indigo-500 transition-colors rounded-xl font-bold flex items-center gap-2 text-sm"><RefreshCw size={18} /> Retry</button>
        </div>
    </div>
);

export default Dashboard;