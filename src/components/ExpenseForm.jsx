import React from 'react';
import { PlusCircle, Calendar, ChevronDown } from 'lucide-react';

const ExpenseForm = ({ formData, setFormData, onAddExpense, categories }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onAddExpense();
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl mb-6 p-6 border border-slate-200">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-xl flex items-center justify-center">
          <span className="text-white text-xl">💰</span>
        </div>
        <h1 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
          Minimalist Finance Tracker
        </h1>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Input Form */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <div className="relative">
            <label className="block text-sm font-medium text-slate-600 mb-2">Amount</label>
            <input
              type="number"
              placeholder="Enter amount"
              value={formData.amount}
              onChange={(e) => setFormData({...formData, amount: e.target.value})}
              className="w-full px-4 py-3 border border-slate-200 outline-none rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-slate-50 hover:bg-white"
              required
            />
            {/* <span className="absolute left-4 top-[42px] text-slate-400 pointer-events-none">₦</span> */}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-600 mb-2">Category</label>
            <div className="relative">
              <select
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                className="w-full px-4 py-3 border border-slate-200 outline-none rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-slate-50 hover:bg-white appearance-none cursor-pointer"
                required
              >
                <option value="">Select category</option>
                {categories.map(category => (
                  <option key={category.name} value={category.name}>
                    {category.icon} {category.name}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-600 mb-2">Date</label>
            <div className="relative">
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({...formData, date: e.target.value})}
                className="w-full px-4 py-3 border border-slate-200 outline-none rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-slate-50 hover:bg-white"
                required
              />
              {/* <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" /> */}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-600 mb-2">Action</label>
            <button
              type="submit"
              className="w-full px-4 py-3 bg-gradient-to-r from-emerald-500 to-blue-500 text-white rounded-xl hover:from-emerald-600 hover:to-blue-600 transition-all duration-200 flex items-center justify-center gap-2 font-medium shadow-lg hover:shadow-xl"
            >
              <PlusCircle className="w-5 h-5" />
              Add
            </button>
          </div>
        </div>

        {/* Description Field */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-slate-600 mb-2">Description</label>
          <input
            type="text"
            placeholder="Enter expense description"
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            className="w-full px-4 py-3 border border-slate-200 outline-none rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-slate-50 hover:bg-white"
            required
          />
        </div>
      </form>
    </div>
  );
};

export default ExpenseForm;