import React, { useState } from 'react';
import ExpenseForm from './components/ExpenseForm';
import Filter from './components/Filter';
import ExpenseList from './components/ExpenseList';
import Summary from './components/Summary';
import ThemeToggle from './components/ThemeToggle';
import useDarkMode from "./hooks/useDarkMode"
import useLocalStorage from './hooks/useLocalstorage';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const App = () => {

  const [isDarkMode, setIsDarkMode] = useDarkMode();
   const [isModalOpen, setIsModalOpen] = useState(false);
const [categories, setCategories] = useLocalStorage("categories", [
  { name: "Food", icon: "🍔", type:"default" },
  { name: "Transport", icon: "🚌", type:"default"  },
  { name: "Rent", icon: "🏠", type:"default"  },
  { name: "Entertainment", icon: "🎬", type:"default"  },
  { name: "Shopping", icon: "🛍️", type:"default"  },
  { name: "Healthcare", icon: "🏥", type:"default"  },
]);
 const [newName, setnewName] = useState("")

// console.log(newName);

const editCategory = (oldName, updatedName) => {
  if (!updatedName.trim()) return; // prevent empty name
  
  setCategories((prev) =>
    prev.map((cat) =>
      cat.name === oldName ? { ...cat, name: updatedName } : cat
    )
  );
  toast.success("Category edited successfully")
  setnewName(""); // reset input
};



const deleteCategory = (name) => {
  const updatedCategories = categories.filter(
    (category) => category.name !== name
  );
  setCategories(updatedCategories);
  toast.error("A category deleted")

};






 const [newCategory, setNewCategory] = useState("");
  
  const handleAddCategory = () => {
  if (!newCategory.trim()) return;

  const updatedCategories = [
    ...categories,
    { name: newCategory, icon: "🔖", type:"custom"  } 
  ];

  setCategories(updatedCategories); 
  console.log("New Category Added:", newCategory);

  setNewCategory("");
  setIsModalOpen(false);
  toast.success("New category added!")
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
    toast.success("Expense deleted!")
  };


  const setDescription = (e) => {
     setDesc(e.target.value);
     filterByDescription(expenses, desc)
  }



  const filterByDescription = (expenses, desc) => {
    // console.log(desc);
    
    let filtered = expenses.filter(expense => expense.description.toLowerCase().includes(desc.toLowerCase()))
    // console.log(filtered);g
    return filtered
  }

  // Apply both category and date filters
  let filteredExpenses = expenses;
  // console.log(expenses);
  
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
            newCategory={newCategory}
            setNewCategory={setNewCategory}
            handleAddCategory={handleAddCategory}
            deleteCategory={deleteCategory}
            editCategory={editCategory}
            setnewName={setnewName}
            newName={newName}
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
        </div>
        <ToastContainer/>
      </div>
    </div>
  );
};

export default App;