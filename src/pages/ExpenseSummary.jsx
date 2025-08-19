import React from 'react'
import useLocalStorage from "../hooks/useLocalStorage";
import Summary from '../components/Summary';
const ExpenseSummary = () => {
 const defaultExpenses = [
  
  ];

    const [expenses, setExpenses] = useLocalStorage(
    "finance-tracker-expenses",
    defaultExpenses
  );

   const [categories, setCategories] = useLocalStorage("categories", [
    { name: "Food", icon: "🍔", type: "default" },
    { name: "Transport", icon: "🚌", type: "default" },
    { name: "Rent", icon: "🏠", type: "default" },
    { name: "Entertainment", icon: "🎬", type: "default" },
    { name: "Shopping", icon: "🛍️", type: "default" },
    { name: "Healthcare", icon: "🏥", type: "default" },
  ]);
  return (
      <div className="">   
          <Summary 
            expenses={expenses}
            categories={categories}
            // isDarkMode={isDarkMode}
          />
        </div>
  )
}

export default ExpenseSummary