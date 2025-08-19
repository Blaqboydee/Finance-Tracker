import React, { useState } from 'react';
import Summary from '../components/Summary';
import ThemeToggle from '../components/ThemeToggle';
import useDarkMode from "../hooks/useDarkMode"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



const Spendly = () => {

const [isDarkMode, setIsDarkMode] = useDarkMode();



// console.log(newName);


  // Default expenses data
  const defaultExpenses = [
    { id: 1, category: 'Food', amount: 2000, date: '2025-08-14', description: 'Lunch at restaurant', icon: '🍔' },
    { id: 2, category: 'Transport', amount: 500, date: '2025-08-14', description: 'Bus fare', icon: '🚌' },
    { id: 3, category: 'Rent', amount: 20000, date: '2025-08-10', description: 'Monthly rent', icon: '🏠' },
  ];

  // Use localStorage hook for expenses persistence

  const [expenses, setExpenses] = useLocalStorage('finance-tracker-expenses', defaultExpenses);
  
  

  // Use localStorage hook for filter state persistence (optional)


  // Apply both category and date filters
  // console.log(expenses);
  
 
  

  return (
    <div className={`min-h-screen p-4 font-sans transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-slate-900 to-slate-800' 
        : 'bg-gradient-to-br from-slate-50 to-blue-50'
    }`}>
      <div className="max-w-4xl mx-auto">
        {/* Theme Toggle - Fixed position */}
        <div className="fixed top-6 right-6 z-50">
          <ThemeToggle isDarkMode={isDarkMode} toggleDarkMode={setIsDarkMode} />
        </div>

  <div className={isDarkMode ? 'dark' : ''}>
        
          
        
          
       
          
          <Summary 
            expenses={filteredExpenses}
            categories={categories}
            isDarkMode={isDarkMode}
          />
        </div>
 
      
        <ToastContainer/>
      </div>
    </div>
  );
};

export default Spendly;