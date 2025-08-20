import React from 'react';
import SpendlyLogo from "../assets/spendlylogo.png";

const Navbar = () => {
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 h-20 border-b shadow-lg transition-all duration-300 
      bg-white/95 border-slate-200 shadow-slate-200/20 dark:bg-slate-800/95 dark:border-slate-700 dark:shadow-slate-900/20 backdrop-blur-md"
    >
      <div className="flex justify-between items-center h-full px-4 md:px-6">
        <div className="flex items-center gap-3">
          <img className="w-8 md:w-12" src={SpendlyLogo} alt="Spendly Logo" />
          <div>
            <h1 className="md:text-2xl font-bold text-slate-800 dark:text-white">
              Spendly
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Track your expenses
            </p>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
