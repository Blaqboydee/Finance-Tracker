// Layout.jsx
import { Outlet, NavLink } from "react-router-dom";
import useDarkMode from "../hooks/useDarkMode";
import ThemeToggle from "../components/ThemeToggle";
import SpendlyLogo from "../assets/spendlylogo.png";

export default function Layout() {
  const [isDarkMode, setIsDarkMode] = useDarkMode();

  return (
<div
  className={`h-[100vh] flex flex-col w-full backdrop-blur-sm transition-all duration-300 ${
    isDarkMode ? "bg-slate-800 text-slate-100" : "bg-white text-slate-900"
  }`}
>
  {/* Top Nav - Fixed */}
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

  {/* Page Content - Scrollable between fixed bars */}
  <main className="flex-1 overflow-y-auto pt-20 pb-16 px-2 md:px-6">
    <Outlet context={{ isDarkMode }} />
  </main>

  {/* Bottom Nav - Fixed */}
 <div
  className={`fixed bottom-0 left-0 right-0 h-16 border-t shadow-inner flex ${
    isDarkMode
      ? "bg-slate-800/95 border-slate-700"
      : "bg-white/95 border-slate-200"
  } rounded-t-2xl`}
>
  <NavLink
    to="/layout/dashboard"
    className={({ isActive }) =>
      `flex-1 flex flex-col items-center gap-1 py-2 transition-all duration-300 transform hover:scale-[1.05] 
      ${isActive ? "text-blue-600" : isDarkMode ? "text-slate-200" : "text-slate-800"}`
    }
    aria-label="Home"
  >
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
    <span className="text-xs font-medium">Home</span>
  </NavLink>
  
  {/* Expenses tab */}
  <NavLink
    to="/layout/expenses"
    className={({ isActive }) =>
      `flex-1 flex flex-col items-center gap-1 py-2 transition-all duration-300 transform hover:scale-[1.05] 
      ${isActive ? "text-blue-600" : isDarkMode ? "text-slate-200" : "text-slate-800"}`
    }
    aria-label="Expenses"
  >
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
    </svg>
    <span className="text-xs font-medium">Expenses</span>
  </NavLink>
  
  {/* Summary tab */}
  <NavLink
    to="/layout/summary"
    className={({ isActive }) =>
      `flex-1 flex flex-col items-center gap-1 py-2 transition-all duration-300 transform hover:scale-[1.05] 
      ${isActive ? "text-blue-600" : isDarkMode ? "text-slate-200" : "text-slate-800"}`
    }
    aria-label="Summary"
  >
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5l5 5v11a2 2 0 01-2 2z" />
    </svg>
    <span className="text-xs font-medium">Summary</span>
  </NavLink>
</div>

</div>

  );
}
