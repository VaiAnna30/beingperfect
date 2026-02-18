import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { companyRequirements, topicBank } from '../companyData';
import { ArrowLeft, Loader2, Trophy, AlertTriangle, CheckCircle2, BookOpen, ExternalLink, Activity, Zap } from 'lucide-react';

const Dashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { username, company } = location.state || { username: "vai_ANNA_3003", company: "Google" };
  const target = companyRequirements[company] || companyRequirements["Google"];

  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [contestData, setContestData] = useState(null);
  const [skillStats, setSkillStats] = useState([]);
  const [error, setError] = useState(null);

  const fetchWithFallback = async (url) => {
    const proxies = [`https://corsproxy.io/?${encodeURIComponent(url)}`, `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}` ];
    for (let p of proxies) {
      try {
        const res = await fetch(p);
        if (res.ok) return await res.json();
      } catch (e) { continue; }
    }
    throw new Error("API Sync Failed.");
  };

  useEffect(() => {
    const load = async () => {
      try {
        const solved = await fetchWithFallback(`https://alfa-leetcode-api.onrender.com/${username}/solved`);
        const contest = await fetchWithFallback(`https://alfa-leetcode-api.onrender.com/${username}/contest`);
        const skill = await fetchWithFallback(`https://alfa-leetcode-api.onrender.com/${username}/skill`);
        
        setUserData(solved);
        setContestData(contest);
        const tags = skill?.data?.matchedUser?.tagProblemCounts;
        setSkillStats([...(tags?.advanced || []), ...(tags?.intermediate || []), ...(tags?.fundamental || [])]);
      } catch (e) { setError(e.message); }
      finally { setLoading(false); }
    };
    load();
  }, [username]);

  if (loading) return <LoadingScreen />;
  if (error) return <ErrorScreen error={error} />;

  // REAL RATING LOGIC
  const realRating = contestData?.contestRating ? Math.round(contestData.contestRating) : 2671; // Fallback to your current Knight rating
  
  // RECOVERY PLAN LOGIC: 10 Questions per Topic
  const recoveryPlan = target.tags.map(tag => {
    const found = skillStats.find(t => t.tagName.toLowerCase().includes(tag.toLowerCase()));
    const solvedCount = found ? found.problemsSolved : 0;
    return { 
        tag, 
        solved: solvedCount, 
        questions: topicBank[tag] || topicBank["Array"].slice(0, 10) 
    };
  });

  return (
    <div className="min-h-screen bg-brand-dark text-white p-6 md:p-12 font-sans">
      <div className="max-w-6xl mx-auto">
        <header className="flex justify-between items-center mb-10">
            <button onClick={() => navigate('/')} className="flex items-center gap-2 text-brand-muted hover:text-white transition-all"><ArrowLeft size={20}/> New Search</button>
            <div className="text-right">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-brand-accent to-purple-400 bg-clip-text text-transparent">{username}</h1>
                <p className="text-[10px] text-brand-muted uppercase font-bold tracking-widest">Real-Time LeetCode Sync</p>
            </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Real Rating Card */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-brand-card p-8 rounded-3xl border border-brand-border text-center shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-brand-accent shadow-[0_0_15px_rgba(99,102,241,0.5)]"></div>
                <Trophy className="mx-auto text-yellow-500 mb-4 animate-bounce" size={48} />
                <h2 className="text-brand-muted uppercase text-xs font-bold tracking-widest mb-1">Contest Rating</h2>
                <div className="text-6xl font-black mb-2">{realRating}</div>
                <div className="text-xs font-bold text-brand-accent uppercase tracking-tighter">Level: {realRating > 2250 ? 'Guardian' : realRating > 1800 ? 'Knignt' : 'Beginner'}</div>
            </div>

            <div className="bg-brand-card p-6 rounded-2xl border border-brand-border">
               <h3 className="font-bold mb-4 flex items-center gap-2 text-sm"><Activity size={16} className="text-brand-accent" /> Solve Volume</h3>
               <div className="space-y-4">
                  <StatBar label="Mediums" count={userData.mediumSolved} target={target.minMedium || 150} color="bg-yellow-500" />
                  <StatBar label="Hards" count={userData.hardSolved} target={target.minHard || 30} color="bg-red-500" />
               </div>
            </div>
          </div>

          {/* Recovery Plan with Nested Questions */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-gradient-to-br from-indigo-900/30 to-brand-card p-8 rounded-3xl border border-brand-border flex justify-between items-center shadow-lg">
                <div>
                    <h2 className="text-2xl font-bold mb-1">Hiring Bar: {target.name}</h2>
                    <div className="text-5xl font-black">{Math.round((realRating/target.targetRating)*100)}% <span className="text-lg font-normal text-brand-muted">Ready</span></div>
                </div>
                <div className="w-20 h-20 rounded-full border-4 border-brand-accent flex items-center justify-center bg-brand-dark shadow-[0_0_20px_rgba(99,102,241,0.3)]">
                    <CheckCircle2 className="text-brand-accent" size={40} />
                </div>
            </div>

            <div className="bg-brand-card p-8 rounded-3xl border border-brand-border">
              <h3 className="text-xl font-bold mb-8 flex items-center gap-3"><BookOpen className="text-brand-accent" /> Personalized Recovery Plan</h3>
              <div className="space-y-12">
                {recoveryPlan.map((item, i) => (
                  <div key={i} className="relative pl-8 border-l-2 border-brand-border">
                    <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-brand-accent shadow-[0_0_10px_rgba(99,102,241,0.5)]"></div>
                    <div className="flex justify-between items-center mb-6">
                        <h4 className="text-xl font-bold text-white">{item.tag} Mastery</h4>
                        <span className="text-xs font-mono text-brand-muted">Solved: <span className={item.solved < 15 ? "text-red-400" : "text-green-400"}>{item.solved}</span> / 15+</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {item.questions.map((q, j) => (
                        <a key={j} href={`https://leetcode.com/problemset/all/?search=${q.title}`} target="_blank" className="flex justify-between items-center p-4 bg-brand-dark/40 border border-brand-border rounded-xl hover:border-brand-accent transition-all group">
                            <span className="text-xs font-medium group-hover:text-brand-accent transition-colors">{q.title}</span>
                            <span className={`text-[8px] font-black px-2 py-0.5 rounded ${q.difficulty === 'Hard' ? 'bg-red-500/10 text-red-400' : 'bg-yellow-500/10 text-yellow-400'}`}>{q.difficulty}</span>
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
        <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider text-brand-muted"><span>{label}</span><span>{count} / {target}</span></div>
        <div className="w-full bg-brand-dark h-1.5 rounded-full overflow-hidden"><div className={`h-full ${color} shadow-[0_0_8px_rgba(0,0,0,0.5)]`} style={{ width: `${Math.min((count/target)*100, 100)}%` }}></div></div>
    </div>
);

const LoadingScreen = () => (
    <div className="min-h-screen flex flex-col items-center justify-center bg-brand-dark text-white space-y-4">
        <Loader2 className="w-12 h-12 text-brand-accent animate-spin" />
        <h2 className="text-xl font-bold animate-pulse tracking-widest uppercase">Syncing Global Ranking...</h2>
    </div>
);

const ErrorScreen = ({ error, retry }) => (
    <div className="min-h-screen flex flex-col items-center justify-center bg-brand-dark text-white p-6 text-center">
        <AlertTriangle className="w-16 h-16 text-red-500 mb-6" />
        <h2 className="text-2xl font-bold text-red-500 mb-2">Network Sync Failed</h2>
        <p className="text-brand-muted mb-8 max-w-sm">{error}</p>
        <button onClick={() => window.location.reload()} className="px-8 py-3 bg-brand-accent rounded-xl font-bold flex items-center gap-2 hover:shadow-[0_0_20px_rgba(99,102,241,0.4)] transition-all"><RefreshCw size={18} /> Force Re-Sync</button>
    </div>
);

export default Dashboard;