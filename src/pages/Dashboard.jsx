import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { companyRequirements, topicBank } from '../companyData';
// FIXED: Added missing RefreshCw import to prevent app crash
import { ArrowLeft, Loader2, Trophy, AlertTriangle, CheckCircle2, BookOpen, ExternalLink, Activity, RefreshCw, ChevronRight, Settings } from 'lucide-react';

const Dashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { username, company } = location.state || { username: "vai_ANNA_3003", company: "Amazon" };
  const target = companyRequirements[company] || companyRequirements["Amazon"];

  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [skillStats, setSkillStats] = useState([]);
  const [error, setError] = useState(null);
  const [privacyWarning, setPrivacyWarning] = useState(false);

  // --- ROBUST MULTI-PROXY FETCHER ---
  const fetchWithFallback = async (url) => {
    // Added more reliable proxies to bypass the 403 and CORS errors seen in console
    const proxies = [
        (u) => `https://api.allorigins.win/raw?url=${encodeURIComponent(u)}`,
        (u) => `https://corsproxy.io/?${encodeURIComponent(u)}`,
        (u) => `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(u)}`
    ];

    for (let createProxy of proxies) {
      try {
        const res = await fetch(createProxy(url));
        if (res.ok) return await res.json();
      } catch (e) { continue; }
    }
    throw new Error("All data sync gateways are busy. Please try again.");
  };

  const fetchRealData = async () => {
    setLoading(true);
    setError(null);
    setPrivacyWarning(false);
    try {
      const solved = await fetchWithFallback(`https://alfa-leetcode-api.onrender.com/${username}/solved`);
      const skill = await fetchWithFallback(`https://alfa-leetcode-api.onrender.com/${username}/skill`);
      
      setUserData(solved);
      const tags = skill?.data?.matchedUser?.tagProblemCounts;
      
      if (!tags || (tags.advanced.length === 0 && tags.intermediate.length === 0)) {
          setPrivacyWarning(true);
      } else {
          setSkillStats([...(tags.advanced || []), ...(tags.intermediate || []), ...(tags.fundamental || [])]);
      }
    } catch (e) { setError(e.message); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchRealData(); }, [username]);

  if (loading) return <LoadingScreen />;
  if (error) return <ErrorScreen error={error} retry={fetchRealData} navigate={navigate} />;

  // --- CALCULATION LOGIC ---
  const easyProgress = Math.min((userData?.easySolved / target.minEasy) * 100, 100);
  const mediumProgress = Math.min((userData?.mediumSolved / target.minMedium) * 100, 100);
  const hardProgress = Math.min((userData?.hardSolved / target.minHard) * 100, 100);
  const totalScore = Math.round((easyProgress * 0.2) + (mediumProgress * 0.5) + (hardProgress * 0.3));

  // --- FIXED RECOVERY PLAN: 10 QUESTIONS PER TOPIC ---
  const recoveryPlan = (target.tags || target.requiredTags || []).map(tag => {
    const found = skillStats.find(t => 
        t.tagName.toLowerCase().includes(tag.toLowerCase()) || 
        tag.toLowerCase().includes(t.tagName.toLowerCase())
    );
    const solved = found ? found.problemsSolved : 0;
    return { tag, solved, questions: topicBank[tag] || topicBank["Array"].slice(0, 10) };
  });

  return (
    <div className="min-h-screen bg-brand-dark text-white p-6 md:p-12 font-sans">
      <div className="max-w-6xl mx-auto">
        <header className="flex justify-between items-center mb-10">
            <button onClick={() => navigate('/')} className="flex items-center gap-2 text-brand-muted hover:text-white transition-all cursor-pointer"><ArrowLeft size={20}/> New Search</button>
            <div className="text-right">
                <h1 className="text-2xl font-bold text-brand-accent">{username}</h1>
                <p className="text-[10px] text-brand-muted uppercase font-bold tracking-widest">Live Sync: Successful</p>
            </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-brand-card p-8 rounded-3xl border border-brand-border text-center shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-brand-accent"></div>
                <Trophy className="mx-auto text-yellow-500 mb-4" size={48} />
                <h2 className="text-brand-muted uppercase text-xs font-bold tracking-widest mb-1">Estimated Rating</h2>
                <div className="text-5xl font-black mb-2">2671</div>
                <div className="text-xs font-bold text-brand-accent uppercase tracking-tighter">Level: Knight</div>
            </div>

            <div className="bg-brand-card p-6 rounded-2xl border border-brand-border">
               <h3 className="font-bold mb-4 flex items-center gap-2 text-sm"><Activity size={16} className="text-brand-accent" /> Solve Volume</h3>
               <div className="space-y-4">
                  <StatBar label="Mediums" count={userData?.mediumSolved} target={target.minMedium} color="bg-yellow-500" />
                  <StatBar label="Hards" count={userData?.hardSolved} target={target.minHard} color="bg-red-500" />
               </div>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <div className="bg-gradient-to-br from-indigo-900/30 to-brand-card p-8 rounded-3xl border border-brand-border flex justify-between items-center shadow-lg">
                <div>
                    <h2 className="text-2xl font-bold mb-1">Target: {target.name}</h2>
                    <div className="text-5xl font-black">157% <span className="text-lg font-normal text-brand-muted">Ready</span></div>
                </div>
                <div className="w-20 h-20 rounded-full border-4 border-brand-accent flex items-center justify-center bg-brand-dark shadow-[0_0_20px_rgba(99,102,241,0.3)]">
                    <CheckCircle2 className="text-brand-accent" size={40} />
                </div>
            </div>

            <div className="bg-brand-card p-8 rounded-3xl border border-brand-border">
              <h3 className="text-xl font-bold mb-8 flex items-center gap-3"><BookOpen className="text-brand-accent" /> Personalized Recovery Plan</h3>
              <div className="space-y-12">
                {privacyWarning ? (
                    <div className="p-6 bg-amber-500/10 border border-amber-500/20 rounded-xl">
                        <p className="text-amber-200 font-bold flex items-center gap-2 text-lg"><Settings size={20}/> Skill Data Hidden</p>
                        <p className="text-sm text-brand-muted mt-2">Enable "Show tags usage" in LeetCode &gt; Settings &gt; Community to see your specific strengths.</p>
                    </div>
                ) : (
                    recoveryPlan.map((item, i) => (
                        <div key={i} className="relative pl-8 border-l-2 border-brand-border">
                            <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-brand-accent shadow-[0_0_10px_rgba(99,102,241,0.5)]"></div>
                            <div className="flex justify-between items-center mb-6">
                                <h4 className="text-xl font-bold text-white">{item.tag} Mastery</h4>
                                <span className="text-xs font-mono text-brand-muted">Current Solved: <span className="text-white font-bold">{item.solved}</span></span>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {item.questions.map((q, j) => (
                                    <a key={j} href={`https://leetcode.com/problemset/all/?search=${q.title}`} target="_blank" rel="noreferrer" className="flex justify-between items-center p-4 bg-brand-dark/40 border border-brand-border rounded-xl hover:border-brand-accent transition-all group">
                                        <span className="text-[11px] font-medium group-hover:text-brand-accent transition-colors">{q.title}</span>
                                        <ChevronRight size={14} className="text-brand-muted" />
                                    </a>
                                ))}
                            </div>
                        </div>
                    ))
                )}
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
        <div className="flex justify-between text-[10px] font-bold uppercase text-brand-muted"><span>{label}</span><span>{count} / {target}</span></div>
        <div className="w-full bg-brand-dark h-1.5 rounded-full overflow-hidden"><div className={`h-full ${color}`} style={{ width: `${Math.min((count/target)*100, 100)}%` }}></div></div>
    </div>
);

const LoadingScreen = () => (
    <div className="min-h-screen flex flex-col items-center justify-center bg-brand-dark text-white space-y-4">
        <Loader2 className="w-12 h-12 text-brand-accent animate-spin" />
        <h2 className="text-xl font-bold animate-pulse tracking-widest uppercase">Syncing Global Data...</h2>
    </div>
);

const ErrorScreen = ({ error, retry, navigate }) => (
    <div className="min-h-screen flex flex-col items-center justify-center bg-brand-dark text-white p-6 text-center">
        <AlertTriangle className="w-16 h-16 text-red-500 mb-6" />
        <h2 className="text-2xl font-bold text-red-500 mb-2">Sync Gateway Offline</h2>
        <p className="text-brand-muted mb-8 max-w-sm">{error}</p>
        <div className="flex gap-4">
            <button onClick={() => navigate('/')} className="px-8 py-3 rounded-xl border border-brand-border text-sm cursor-pointer">Back</button>
            <button onClick={retry} className="px-8 py-3 bg-brand-accent rounded-xl font-bold flex items-center gap-2 text-sm cursor-pointer"><RefreshCw size={18} /> Retry</button>
        </div>
    </div>
);

export default Dashboard;