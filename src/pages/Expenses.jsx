import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ExpenseForm from "../components/ExpenseForm";
import useLocalStorage from "../hooks/useLocalStorage";
import Filter from "../components/Filter";
import ExpenseList from "../components/ExpenseList";
import useDarkMode from "../hooks/useDarkMode";

import { useOutletContext } from "react-router-dom";

const Expenses = () => {
  const [isDarkMode, setIsDarkMode] = useDarkMode();
  

  const [formData, setFormData] = useState({
    amount: "",
    category: "",
    date: new Date().toISOString().split("T")[0],
    description: "",
  });

  const [categories, setCategories] = useLocalStorage("categories", [
    { name: "Food", icon: "🍔", type: "default" },
    { name: "Transport", icon: "🚌", type: "default" },
    { name: "Rent", icon: "🏠", type: "default" },
    { name: "Entertainment", icon: "🎬", type: "default" },
    { name: "Shopping", icon: "🛍️", type: "default" },
    { name: "Healthcare", icon: "🏥", type: "default" },
  ]);

  const defaultExpenses = [];

  const [expenses, setExpenses] = useLocalStorage(
    "finance-tracker-expenses",
    defaultExpenses
  );

  const [newCategory, setNewCategory] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [newName, setnewName] = useState("");

  const editCategory = (oldName, updatedName) => {
    if (!updatedName.trim()) return;

    setCategories((prev) =>
      prev.map((cat) =>
        cat.name === oldName ? { ...cat, name: updatedName } : cat
      )
    );
    toast.success("Category edited successfully");
    setnewName(""); // reset input
  };

  const deleteCategory = (name) => {
    const updatedCategories = categories.filter(
      (category) => category.name !== name
    );
    setCategories(updatedCategories);
    toast.error("A category deleted");
  };

  const handleAddExpense = () => {
    if (formData.amount && formData.category && formData.description) {
      const selectedCategory = categories.find(
        (cat) => cat.name === formData.category
      );
      const newExpense = {
        id: Date.now(), // Using timestamp for unique ID
        ...formData,
        amount: parseFloat(formData.amount),
        icon: selectedCategory?.icon || "📝",
      };

      // Add new expense to the beginning of the array
      setExpenses((prevExpenses) => [newExpense, ...prevExpenses]);
      toast.success("Expense recorded successfully!")
      // Reset form data
      setFormData({
        amount: "",
        category: "",
        date: new Date().toISOString().split("T")[0],
        description: "",
      });
    }
  };

  const handleAddCategory = () => {
    if (!newCategory.trim()) return;

    const updatedCategories = [
      ...categories,
      { name: newCategory, icon: "🔖", type: "custom" },
    ];

    setCategories(updatedCategories);
    console.log("New Category Added:", newCategory);

    setNewCategory("");
    setIsModalOpen(false);
    toast.success("New category added!");
  };

  let filteredExpenses = expenses;

  const handleDeleteExpense = (id) => {
    setExpenses((prevExpenses) =>
      prevExpenses.filter((expense) => expense.id !== id)
    );
    toast.success("Expense deleted!");
  };
  const [filterCategory, setFilterCategory] = useLocalStorage(
    "finance-tracker-filter",
    "All Categories"
  );

  // Filter by category
  if (filterCategory !== "All Categories") {
    filteredExpenses = filteredExpenses.filter(
      (expense) => expense.category === filterCategory
    );
  }

  // Date filtering function
  const filterByDateRange = (expenses, range) => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    switch (range) {
      case "thisMonth":
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        return expenses.filter(
          (expense) => new Date(expense.date) >= startOfMonth
        );

      case "last30":
        const thirtyDaysAgo = new Date(today);
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        return expenses.filter(
          (expense) => new Date(expense.date) >= thirtyDaysAgo
        );

      case "thisYear":
        const startOfYear = new Date(now.getFullYear(), 0, 1);
        return expenses.filter(
          (expense) => new Date(expense.date) >= startOfYear
        );

      default:
        return expenses;
    }
  };

  const [dateRange, setDateRange] = useLocalStorage(
    "finance-tracker-date-range",
    "all"
  );
  const [desc, setDesc] = useState("");

  const filterByDescription = (expenses, desc) => {
    // console.log(desc);

    let filtered = expenses.filter((expense) =>
      expense.description.toLowerCase().includes(desc.toLowerCase())
    );
    // console.log(filtered);g
    return filtered;
  };

  // Filter by date range
  filteredExpenses = filterByDateRange(filteredExpenses, dateRange);
  filteredExpenses = filterByDescription(filteredExpenses, desc);

  const setDescription = (e) => {
    setDesc(e.target.value);
    filterByDescription(expenses, desc);
  };

  return (
    <div className="space-y-6 font-sans transition-colors duration-300">
      <ExpenseForm
        formData={formData}
        setFormData={setFormData}
        onAddExpense={handleAddExpense}
        categories={categories}
        setIsModalOpen={setIsModalOpen}
        newCategory={newCategory}
        setNewCategory={setNewCategory}
        handleAddCategory={handleAddCategory}
        deleteCategory={deleteCategory}
        editCategory={editCategory}
        setnewName={setnewName}
        newName={newName}
        isDarkMode={isDarkMode}
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
      <ToastContainer />
    </div>
  );
};

export default Expenses;
