import React, { useState } from 'react';
import ExpenseForm from './components/ExpenseForm';
import Filter from './components/Filter';
import ExpenseList from './components/ExpesnseList';
import Summary from './components/Summary';
import useLocalStorage from './hooks/useLocalstorage';


const App = () => {
  // Default expenses data
  const defaultExpenses = [
    { id: 1, category: 'Food', amount: 2000, date: '2025-08-14', description: 'Lunch at restaurant', icon: '🍔' },
    { id: 2, category: 'Transport', amount: 500, date: '2025-08-14', description: 'Bus fare', icon: '🚌' },
    { id: 3, category: 'Rent', amount: 20000, date: '2025-08-10', description: 'Monthly rent', icon: '🏠' },
  ];

  // Use localStorage hook for expenses persistence
  const [expenses, setExpenses] = useLocalStorage('finance-tracker-expenses', defaultExpenses);
  
  // Use localStorage hook for form data persistence (optional - for better UX)
  const [formData, setFormData] = useLocalStorage('finance-tracker-form', {
    amount: '',
    category: '',
    date: new Date().toISOString().split('T')[0],
    description: ''
  });

  // Use localStorage hook for filter state persistence (optional)
  const [filterCategory, setFilterCategory] = useLocalStorage('finance-tracker-filter', 'All Categories');
  const [dateRange, setDateRange] = useLocalStorage('finance-tracker-date-range', 'all');

  const categories = [
    { name: 'Food', icon: '🍔' },
    { name: 'Transport', icon: '🚌' },
    { name: 'Rent', icon: '🏠' },
    { name: 'Entertainment', icon: '🎬' },
    { name: 'Shopping', icon: '🛍️' },
    { name: 'Healthcare', icon: '🏥' }
  ];

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

  // Apply both category and date filters
  let filteredExpenses = expenses;
  
  // Filter by category
  if (filterCategory !== 'All Categories') {
    filteredExpenses = filteredExpenses.filter(expense => expense.category === filterCategory);
  }
  
  // Filter by date range
  filteredExpenses = filterByDateRange(filteredExpenses, dateRange);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 font-sans">
      <div className="max-w-4xl mx-auto">
        <ExpenseForm 
          formData={formData}
          setFormData={setFormData}
          onAddExpense={handleAddExpense}
          categories={categories}
        />
        
        <Filter 
          filterCategory={filterCategory}
          setFilterCategory={setFilterCategory}
          dateRange={dateRange}
          setDateRange={setDateRange}
          categories={categories}
        />
        
        <ExpenseList 
          expenses={filteredExpenses}
          onDeleteExpense={handleDeleteExpense}
        />
        
        <Summary 
          expenses={filteredExpenses}
          categories={categories}
        />

       
      </div>
    </div>
  );
};

export default App;