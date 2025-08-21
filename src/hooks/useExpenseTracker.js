import { useState, useEffect } from 'react';

const calcCategoryTotals = (expenses, categories) => {
  if (!expenses.length || !categories.length) return [];
  
  const totals = {};
  expenses.forEach(expense => {
    totals[expense.category] = (totals[expense.category] || 0) + expense.amount;
  });
  
  return Object.entries(totals).map(([name, total]) => ({ name, total }));
};

const categoryMap = {
  Entertainment: "Ent.",
  Transport: "Trans.",
  Food: "Fd",
  Shopping: "Shop",
  Healthcare: "Health"
};

const useExpenseTracker = () => {
  // State management
  const [expenses, setExpenses] = useState(() => {
    return JSON.parse(localStorage.getItem("finance-tracker-expenses")) || [];
  });

  const [categories, setCategories] = useState(() => {
    return JSON.parse(localStorage.getItem("categories")) || [];
  });

  const [totalExpense, setTotalExpense] = useState(0);
  const [highestAmount, setHighestAmount] = useState(0);
  const [highestCategory, setHighestCategory] = useState(null);
  const [outerRadius, setOuterRadius] = useState(80);

  // Derived values
  const recentExpenses = expenses.slice(0, 3);
  const categoryTotals = calcCategoryTotals(expenses, categories);

  const colors = [
    "#3B82F6", // blue
    "#10B981", // green
    "#8B5CF6", // purple
    "#F97316", // orange
    "#EC4899", // pink
    "#6366F1", // indigo
  ];

  // Effect for calculating expense statistics
  useEffect(() => {
    if (expenses.length === 0) {
      setTotalExpense(0);
      setHighestAmount(0);
      setHighestCategory(null);
      return;
    }

    let total = 0;
    let highest = expenses[0];

    for (const t of expenses) {
      total += t.amount;
      if (t.amount > highest.amount) {
        highest = t;
      }
    }

    setTotalExpense(total);
    setHighestAmount(highest.amount);
    setHighestCategory(highest);
  }, [expenses]);

  // Effect for handling responsive chart sizing
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setOuterRadius(50);
      } else if (window.innerWidth < 1024) {
        setOuterRadius(70);
      } else {
        setOuterRadius(100);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);





  



  // Return all the values and functions that components need
  return {
    // State values
    expenses,
    setExpenses,
    categories,
    setCategories,
    totalExpense,
    highestAmount,
    highestCategory,
    outerRadius,
    
    // Derived values
    recentExpenses,
    categoryTotals,
    colors,
    categoryMap,
    
    // Components
    // EmptyState,
  };
};

export default useExpenseTracker;