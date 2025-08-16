import React, { useState } from 'react';
import ExpenseForm from './components/ExpenseForm';
import Filter from './components/Filter';
import ExpenseList from './components/ExpenseList';
import Summary from './components/Summary';
import ThemeToggle from './components/ThemeToggle';
import useDarkMode from "./hooks/useDarkMode"
import useLocalStorage from './hooks/useLocalStorage';

const App = () => {

  const [isDarkMode, setIsDarkMode] = useDarkMode();
 const [newCategory, setNewCategory] = useState("");
   const [isModalOpen, setIsModalOpen] = useState(false);
const [categories, setCategories] = useLocalStorage("categories", [
  { name: "Food", icon: "🍔" },
  { name: "Transport", icon: "🚌" },
  { name: "Rent", icon: "🏠" },
  { name: "Entertainment", icon: "🎬" },
  { name: "Shopping", icon: "🛍️" },
  { name: "Healthcare", icon: "🏥" },
]);




const handleAddCategory = () => {
  if (!newCategory.trim()) return;

  const updatedCategories = [
    ...categories,
    { name: newCategory, icon: "🔖" } 
  ];

  setCategories(updatedCategories); 
  console.log("New Category Added:", newCategory);

  setNewCategory("");
  setIsModalOpen(false);
};


  
 

  // Default expenses data
  const defaultExpenses = [
    { id: 1, category: 'Food', amount: 2000, date: '2025-08-14', description: 'Lunch at restaurant', icon: '🍔' },
    { id: 2, category: 'Transport', amount: 500, date: '2025-08-14', description: 'Bus fare', icon: '🚌' },
    { id: 3, category: 'Rent', amount: 20000, date: '2025-08-10', description: 'Monthly rent', icon: '🏠' },
  ];

  // Use localStorage hook for expenses persistence

  const [expenses, setExpenses] = useLocalStorage('finance-tracker-expenses', defaultExpenses);
  
  const [formData, setFormData] = useState({
    amount: '',
    category: '',
    date: new Date().toISOString().split('T')[0],
    description: ''
  });

  // Use localStorage hook for filter state persistence (optional)
  const [filterCategory, setFilterCategory] = useLocalStorage('finance-tracker-filter', 'All Categories');
  const [dateRange, setDateRange] = useLocalStorage('finance-tracker-date-range', 'all');
  const [desc, setDesc] = useState("")
 

  // Date filtering function
  const filterByDateRange = (expenses, range) => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    
    switch (range) {
      case 'thisMonth':
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        return expenses.filter(expense => new Date(expense.date) >= startOfMonth);
      
      case 'last30':
        const thirtyDaysAgo = new Date(today);
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        return expenses.filter(expense => new Date(expense.date) >= thirtyDaysAgo);
      
      case 'thisYear':
        const startOfYear = new Date(now.getFullYear(), 0, 1);
        return expenses.filter(expense => new Date(expense.date) >= startOfYear);
      
      default:
        return expenses;
    }
  };

  

  const handleAddExpense = () => {
    if (formData.amount && formData.category && formData.description) {
      const selectedCategory = categories.find(cat => cat.name === formData.category);
      const newExpense = {
        id: Date.now(), // Using timestamp for unique ID
        ...formData,
        amount: parseFloat(formData.amount),
        icon: selectedCategory?.icon || '📝'
      };
      
      // Add new expense to the beginning of the array
      setExpenses(prevExpenses => [newExpense, ...prevExpenses]);
      
      // Reset form data
      setFormData({
        amount: '',
        category: '',
        date: new Date().toISOString().split('T')[0],
        description: ''
      });
    }
  };

  const handleDeleteExpense = (id) => {
    setExpenses(prevExpenses => prevExpenses.filter(expense => expense.id !== id));
  };


  const setDescription = (e) => {
     setDesc(e.target.value);
     filterByDescription(expenses, desc)
  }



  const filterByDescription = (expenses, desc) => {
    console.log(desc);
    
    let filtered = expenses.filter(expense => expense.description.toLowerCase().includes(desc.toLowerCase()))
    console.log(filtered);
    return filtered
  }

  // Apply both category and date filters
  let filteredExpenses = expenses;
  console.log(expenses);
  
  // Filter by category
  if (filterCategory !== 'All Categories') {
    filteredExpenses = filteredExpenses.filter(expense => expense.category === filterCategory);
  }
  
  // Filter by date range
  filteredExpenses = filterByDateRange(filteredExpenses, dateRange);
   filteredExpenses = filterByDescription(filteredExpenses, desc)
  

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
          <ExpenseForm 
            formData={formData}
            setFormData={setFormData}
            onAddExpense={handleAddExpense}
            categories={categories}
            isDarkMode={isDarkMode}
            setIsModalOpen={setIsModalOpen}
          />
          
          <Filter 
            filterCategory={filterCategory}
            setFilterCategory={setFilterCategory}
            dateRange={dateRange}
            setDateRange={setDateRange}
            categories={categories}
            isDarkMode={isDarkMode}
           setDescription={setDescription}
          />
          
          <ExpenseList 
            expenses={filteredExpenses}
            onDeleteExpense={handleDeleteExpense}
            isDarkMode={isDarkMode}
          />
          
          <Summary 
            expenses={filteredExpenses}
            categories={categories}
            isDarkMode={isDarkMode}
          />



              {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div
            className={`p-6 rounded-xl shadow-lg w-96
              ${isDarkMode ? "bg-slate-800 text-slate-100" : "bg-white text-slate-900"}`}
          >
            <h2 className="text-lg font-semibold mb-4">Add New Category</h2>

            <input
              type="text"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder="Enter category name"
              className={`w-full px-4 py-2 rounded-lg border mb-4 outline-none
                ${
                  isDarkMode
                    ? "bg-slate-700 border-slate-600 text-slate-100"
                    : "bg-slate-50 border-slate-300 text-slate-900"
                }`}
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 rounded-lg bg-gray-400 text-white hover:bg-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={handleAddCategory}
                className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
        </div>
      </div>
    </div>
  );
};

export default App;