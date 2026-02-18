import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Search, Building2, ChevronDown } from 'lucide-react';
import { companyRequirements } from '../companyData';

const Home = () => {
  const [username, setUsername] = useState('');
  
  // Searchable Dropdown States
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCompany, setSelectedCompany] = useState(null); // The actual object
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  // Get list of companies from data
  const companiesList = Object.keys(companyRequirements);

  // Filter logic: Show matches based on search term
  const filteredCompanies = companiesList.filter(company => 
    company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Close dropdown if clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleAnalyze = () => {
    if (!username.trim()) {
      alert("Please enter a LeetCode username!");
      return;
    }
    // Default to Google if nothing selected, otherwise use the selected name
    const target = selectedCompany || "Google";
    navigate('/dashboard', { state: { username, company: target } });
  };

  const handleSelectCompany = (company) => {
    setSelectedCompany(company);
    setSearchTerm(company); // Update input text
    setIsDropdownOpen(false); // Close dropdown
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden bg-brand-dark">
      
      {/* Background Decor */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-brand-accent/20 rounded-full blur-[100px] animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-600/20 rounded-full blur-[100px] animate-pulse"></div>

      <div className="relative z-10 text-center max-w-4xl w-full">
        
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-card border border-brand-border text-brand-muted text-sm mb-8 animate-bounce">
          <span className="w-2 h-2 rounded-full bg-green-500"></span>
          <span>v2.0 Live (Real Data)</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight text-white">
          Are You <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent to-purple-400">Company Ready?</span>
        </h1>
        
        <p className="text-xl text-brand-muted mb-12 max-w-2xl mx-auto">
          Analyze your LeetCode profile against hiring bars for 50+ top tech companies.
        </p>

        {/* Input Container */}
        <div className="flex flex-col lg:flex-row gap-4 bg-brand-card/50 p-3 rounded-2xl border border-brand-border backdrop-blur-sm shadow-2xl max-w-3xl mx-auto">
          
          {/* 1. Username Input (LEETCODE VERSION) */}
          <div className="flex items-center gap-3 bg-brand-dark/50 px-4 py-4 rounded-xl flex-1 border border-transparent focus-within:border-brand-accent transition-all group">
            <Search className="text-brand-muted group-focus-within:text-brand-accent" size={20} />
            <input 
              type="text" 
              placeholder="Enter LeetCode Username" 
              className="bg-transparent outline-none text-brand-text w-full placeholder:text-brand-muted/50 font-medium"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          {/* 2. SEARCHABLE Company Dropdown */}
          <div className="relative flex-1" ref={dropdownRef}>
            <div 
              className="flex items-center gap-3 bg-brand-dark/50 px-4 py-4 rounded-xl border border-transparent focus-within:border-brand-accent transition-all cursor-text group"
              onClick={() => setIsDropdownOpen(true)}
            >
              <Building2 className="text-brand-muted group-focus-within:text-brand-accent" size={20} />
              <input 
                type="text" 
                placeholder="Search Target (e.g. Amazon)" 
                className="bg-transparent outline-none text-brand-text w-full placeholder:text-brand-muted/50 font-medium"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setIsDropdownOpen(true);
                  setSelectedCompany(null); // Reset selection if typing
                }}
                onFocus={() => setIsDropdownOpen(true)}
              />
              <ChevronDown size={16} className={`text-brand-muted transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </div>

            {/* The Dropdown List */}
            {isDropdownOpen && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-brand-card border border-brand-border rounded-xl shadow-xl max-h-60 overflow-y-auto z-50">
                {filteredCompanies.length > 0 ? (
                  filteredCompanies.map((comp) => (
                    <div 
                      key={comp}
                      onClick={() => handleSelectCompany(comp)}
                      className="px-4 py-3 hover:bg-brand-accent/20 hover:text-white text-brand-muted cursor-pointer transition-colors text-left flex justify-between"
                    >
                      <span className="font-medium">{comp}</span>
                      {/* Show Problems Count Preview */}
                      <span className="text-xs bg-brand-dark px-2 py-1 rounded text-brand-muted">
                        {companyRequirements[comp].minEasy + companyRequirements[comp].minMedium + companyRequirements[comp].minHard}+ Problems
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="px-4 py-3 text-brand-muted text-sm">No companies found</div>
                )}
              </div>
            )}
          </div>

          {/* 3. Action Button */}
          <button 
            onClick={handleAnalyze}
            className="flex items-center justify-center gap-2 bg-brand-accent hover:bg-brand-glow text-white px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-indigo-500/30 cursor-pointer active:scale-95 whitespace-nowrap"
          >
            Check Now <ArrowRight size={20} />
          </button>
        </div>

        <p className="mt-8 text-sm text-brand-muted/60">
          Powered by LeetCode API • {companiesList.length} Companies Tracked
        </p>
      </div>
    </div>
  );
};

export default Home;