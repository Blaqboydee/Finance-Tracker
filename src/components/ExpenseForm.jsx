import React, { useState } from "react";
import { PlusCircle, Calendar, ChevronDown } from "lucide-react";
import CategoryManager from "./CategoryManger";

const ExpenseForm = ({
  formData,
  setFormData,
  onAddExpense,
  categories,
  isDarkMode,
  newCategory,
  setIsModalOpen,
  setNewCategory,
  handleAddCategory,
  deleteCategory,
  editCategory,
  setnewName,
  newName,
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onAddExpense();
  };

  return (
    <div
      className={`rounded-2xl shadow-xl mb-6 p-6 border transition-colors duration-300
    ${
      isDarkMode
        ? "bg-slate-800 border-slate-700 text-slate-100"
        : "bg-white border-slate-200 text-slate-900"
    }`}
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-2xl bg-blue-600 flex items-center justify-center">
          <span className="text-white text-xl">💰</span>
        </div>
        <h1
          className={`text-2xl font-bold bg-clip-text text-transparent
        ${
          isDarkMode
            ? "bg-gradient-to-r from-slate-200 to-slate-400"
            : "bg-gradient-to-r from-slate-800 to-slate-600"
        }`}
        >
          Finance Tracker
        </h1>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Input Form */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <div className="relative">
            <label
              className={`block text-sm font-medium mb-2 
            ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}
            >
              Amount
            </label>
            <input
              type="number"
              placeholder="Enter amount e.g 5000"
              value={formData.amount}
              onChange={(e) =>
                setFormData({ ...formData, amount: e.target.value })
              }
              className={`w-full px-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all
            ${
              isDarkMode
                ? "bg-slate-700 border-slate-600 text-slate-100 placeholder-slate-500 hover:bg-slate-600"
                : "bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400 hover:bg-white"
            }`}
              required
            />
          </div>

          {/* Category */}
          <div>
            <label
              className={`block text-sm font-medium mb-2 
      ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}
            >
              Category
            </label>
            <div className="relative">
              <select
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                className={`w-full px-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none cursor-pointer
            ${
              isDarkMode
                ? "bg-slate-700 border-slate-600 text-slate-100 hover:bg-slate-600"
                : "bg-slate-50 border-slate-200 text-slate-900 hover:bg-white"
            }`}
                required
              >
                <option value="">Select category</option>
                {categories.map((category) => (
                  <option key={category.name} value={category.name}>
                    {category.icon} {category.name}
                  </option>
                ))}
              </select>
              <ChevronDown
                className={`absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 pointer-events-none ${
                  isDarkMode ? "text-slate-500" : "text-slate-400"
                }`}
              />
            </div>

            {/* Manage Categories Button */}
            <CategoryManager
              isDarkMode={isDarkMode}
              categories={categories}
              newCategory={newCategory}
              setNewCategory={setNewCategory}
              handleAddCategory={handleAddCategory}
              deleteCategory={deleteCategory}
              editCategory={editCategory}
              setnewName={setnewName}
              newName={newName}
            />
          </div>

          {/* Date */}
          <div>
            <label
              className={`block text-sm font-medium mb-2 
            ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}
            >
              Date
            </label>
            <div className="relative">
              <input
                type="date"
                value={formData.date}
                onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
                className={`w-full px-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all
              ${
                isDarkMode
                  ? "bg-slate-700 border-slate-600 text-slate-100 hover:bg-slate-600"
                  : "bg-slate-50 border-slate-200 text-slate-900 hover:bg-white"
              }`}
                required
              />
            </div>
          </div>

          {/* Description */}
          <div className="mb-6">
            <label
              className={`block text-sm font-medium mb-2 
          ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}
            >
              Description
            </label>
            <input
              type="text"
              placeholder="Enter expense description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className={`w-full px-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all
          ${
            isDarkMode
              ? "bg-slate-700 border-slate-600 text-slate-100 placeholder-slate-500 hover:bg-slate-600"
              : "bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400 hover:bg-white"
          }`}
              required
            />
          </div>
        </div>

        {/* Action Button */}
        <div>
          <label
            className={`block text-sm font-medium mb-2 
            ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}
          >
            Action
          </label>
          <button
            type="submit"
            className="w-full px-4 py-3 bg-blue-600 text-white rounded-xl hover:from-emerald-600 hover:to-blue-600 transition-all duration-200 flex items-center justify-center gap-2 font-medium shadow-lg hover:shadow-xl"
          >
            <PlusCircle className="w-5 h-5" />
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

export default ExpenseForm;
