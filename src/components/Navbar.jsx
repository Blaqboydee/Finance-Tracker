import React from 'react'
import useDarkMode from "../hooks/useDarkMode";
import ThemeToggle from "../components/ThemeToggle";
import SpendlyLogo from "../assets/spendlylogo.png";

const Navbar = () => {
  const [isDarkMode, setIsDarkMode] = useDarkMode();
    
  return (
     <nav
    className={`fixed top-0 left-0 right-0 z-50 h-20 border-b shadow-lg transition-all duration-300 ${
      isDarkMode
        ? "bg-slate-800/95 border-slate-700 shadow-slate-900/20"
        : "bg-white/95 border-slate-200 shadow-slate-200/20"
    } backdrop-blur-md`}
  >
    <div className="flex justify-between items-center h-full px-4 md:px-6">
      <div className="flex items-center gap-3">
        <img className="w-8 md:w-12" src={SpendlyLogo} alt="" />
        <div>
          <h1
            className={`md:text-2xl font-bold ${
              isDarkMode ? "text-white" : "text-slate-800"
            }`}
          >
            Spendly
          </h1>
          <p
            className={`text-xs ${
              isDarkMode ? "text-slate-400" : "text-slate-500"
            }`}
          >
            Track your expenses
          </p>
        </div>
      </div>

      <div>
        <ThemeToggle isDarkMode={isDarkMode} toggleDarkMode={setIsDarkMode} />
      </div>
    </div>
  </nav>
  )
}

export default Navbar