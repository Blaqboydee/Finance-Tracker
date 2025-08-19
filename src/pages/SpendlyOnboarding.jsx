import React from 'react';
import ThemeToggle from '../components/ThemeToggle';
import useDarkMode from "../hooks/useDarkMode"
import SpendlyLogo from '../components/SpendlyLogo';
import { useNavigate } from 'react-router-dom';
const SpendlyOnboarding = () => {
  const navigate = useNavigate()
  const [isDarkMode, setIsDarkMode] = useDarkMode();

  return (
    
    <div className={`min-h-screen flex flex-col transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-slate-800 text-white' 
        : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 text-slate-800'
    }`}>
      {/* Main Content */}
      <div className='absolute top-3 right-3'>
      <ThemeToggle isDarkMode={isDarkMode} toggleDarkMode={setIsDarkMode} />
      </div>
      <div className="flex flex-1 flex-col items-center justify-center px-6 py-8">
        {/* App Icon */}
        <div className="text-center mb-2 md:mb-8">
       <SpendlyLogo size={80} className="mx-auto mb-2 drop-shadow-2xl" />
        </div>

        {/* Welcome Text */}
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-2xl md:text-4xl font-bold mb-4">Welcome to Spendly</h1>
          <p className={`text-sm md:text-lg leading-relaxed px-4 max-w-md mx-auto ${
            isDarkMode ? 'text-white/80' : 'text-slate-600'
          }`}>
            Take control of your finances with smart expense tracking and insightful analytics
          </p>
        </div>

        {/* Feature List */}
        <div className="space-y-6 mb-12 md:mb-12 max-w-lg mx-auto">
          <div className="flex items-start gap-4">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 ${
              isDarkMode ? 'bg-blue-500/20' : 'bg-blue-100'
            }`}>
              <svg className={`w-6 h-6 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <div>
              <h3 className="md:text-lg font-semibold mb-1">Track Every Expense</h3>
              <p className={`text-[12px] md:text-sm ${isDarkMode ? 'text-white/70' : 'text-slate-500'}`}>Add, categorize, and search through all your expenses with custom categories and smart filtering.</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 ${
              isDarkMode ? 'bg-purple-500/20' : 'bg-purple-100'
            }`}>
              <svg className={`w-6 h-6 ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div>
              <h3 className="md:text-lg font-semibold mb-1">Visual Analytics</h3>
              <p className={`text-[12px] md:text-sm ${isDarkMode ? 'text-white/70' : 'text-slate-500'}`}>Get insights with beautiful charts, monthly summaries, and spending pattern analysis.</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 ${
              isDarkMode ? 'bg-green-500/20' : 'bg-green-100'
            }`}>
              <svg className={`w-6 h-6 ${isDarkMode ? 'text-green-400' : 'text-green-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 17l4 4 4-4m-4-5v9m0-13a9 9 0 110 18 9 9 0 010-18z" />
              </svg>
            </div>
            <div>
              <h3 className="md:text-lg font-semibold mb-1">Export & Backup</h3>
              <p className={`text-[12px] md:text-sm ${isDarkMode ? 'text-white/70' : 'text-slate-500'}`}>Export your data to CSV for backup, taxes, or further analysis. Your data, your control.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Continue Button */}
      <div className="flex justify-center px-6 pb-8">
        <button 
        onClick={()=>{
          localStorage.setItem("hasOnboarded", "true");
          navigate("/layout")
        }}
        className={`md:w-1/2 w-full font-semibold py-4 px-6 rounded-2xl shadow-xl transform transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] ${
          isDarkMode 
            ? 'bg-blue-600 hover:from-blue-600 hover:to-purple-700 text-white' 
            : 'bg-blue-600 hover:from-blue-700 hover:to-purple-800 text-white'
        }`}>
          Continue
        </button>
      </div>

   
    </div>
  );
};

export default SpendlyOnboarding;