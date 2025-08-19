import React from 'react';
import { Sun, Moon } from 'lucide-react';

const ThemeToggle = ({ isDarkMode, toggleDarkMode }) => {
  return (
    <button
      onClick={toggleDarkMode}
      className="relative p-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all duration-200 group"
      aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <div className="relative w-6 h-6">
        {/* Sun Icon */}
        <Sun className={`absolute inset-0 w-6 h-6 text-amber-500 transition-all duration-300 ${
          isDarkMode ? 'rotate-90 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100'
        }`} />
        
        {/* Moon Icon */}
        <Moon className={`absolute inset-0 w-6 h-6 text-slate-700 dark:text-slate-300 transition-all duration-300 ${
          isDarkMode ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-0 opacity-0'
        }`} />
      </div>
    </button>
  );
};

export default ThemeToggle;