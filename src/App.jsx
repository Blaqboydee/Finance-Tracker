import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Dashboard from "./pages/SplendlyDashboard";
import Expenses from "./pages/Expenses";
import ExpenseSummary from "./pages/ExpenseSummary";
import SpendlyOnboarding from "./pages/SpendlyOnboarding";
import Navbar from "./components/Navbar";
import Bottomtab from "./components/Bottomtab";
import Layout from "./pages/Layout";
import { Sun, Moon } from 'lucide-react';

function App() {
  const location = useLocation()
  const hasOnboarded = localStorage.getItem("hasOnboarded") === "true";

  // Dark mode state
  const [isDarkMode, setIsDarkMode] = useState(() => {
  return localStorage.getItem("theme") === "dark"
});


 useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);



  // // Apply theme whenever it changes
  // useEffect(() => {
  //   if (isDarkMode) {
  //     document.documentElement.classList.add("dark");
  //     localStorage.setItem("theme", "dark");
  //   } else {
  //     document.documentElement.classList.remove("dark");
  //     localStorage.setItem("theme", "light");
  //   }
  // }, [isDarkMode]);

  const isOnboardingPage = location.pathname === "/"

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Navbar */}
      {!isOnboardingPage && <Navbar/>}  

      {/* Dark Mode Toggle Button */}
   <div className="fixed right-3 top-3 p-2 z-50 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all duration-200 group">
  <button
    onClick={() => setIsDarkMode(!isDarkMode)}
    className="relative w-6 h-6 flex items-center justify-center"
  >
    {/* Sun Icon */}
    <Sun className={`absolute w-6 h-6 text-amber-500 transition-all duration-300 ${
      isDarkMode ? 'rotate-90 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100'
    }`} />
    
    {/* Moon Icon */}
    <Moon className={`absolute w-6 h-6 text-slate-700 dark:text-slate-300 transition-all duration-300 ${
      isDarkMode ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-0 opacity-0'
    }`} />
  </button>
</div>

      {/* Routes */}
      
       <Routes>
        <Route
          path="/"
          element={
            hasOnboarded ? <Navigate to="/dashboard" /> : <SpendlyOnboarding />
          }
        />
        <Route element={<Layout/>}>
         <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/expenses" element={<Expenses />} />
        <Route path="/summary" element={<ExpenseSummary />} />
        </Route>
    
      </Routes>
      
    

     {!isOnboardingPage && <Bottomtab/>}  
    </div>
  );
}

export default App;
