import React from 'react';
import {Download } from 'lucide-react';
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import SpendingDistribution from './SpendingDistribution';


const Summary = ({ expenses, categories }) => {
  const totalSpent = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  

  const categoryTotals = categories.reduce((acc, category) => {
    const categoryExpenses = expenses.filter(expense => expense.category === category.name);
    const total = categoryExpenses.reduce((sum, expense) => sum + expense.amount, 0);
    if (total > 0) {
      acc.push({ 
        name: category.name, 
        total, 
        icon: category.icon,
        percentage: ((total / totalSpent) * 100).toFixed(1)
      });
    }
    return acc;
  }, []);

  // Sort by total amount (highest first)
  categoryTotals.sort((a, b) => b.total - a.total);

  console.log(categoryTotals);
  

  const exportToCSV = () => {
    const headers = ['Date', 'Category', 'Description', 'Amount'];
    const csvContent = [
      headers.join(','),
      ...expenses.map(expense => [
        expense.date,
        expense.category,
        `"${expense.description}"`, // Wrap in quotes to handle commas
        expense.amount
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `finance-tracker-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 border border-slate-200">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
          <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
          Summary
        </h2>
        <button
          onClick={exportToCSV}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl hover:from-blue-600 hover:to-indigo-600 transition-all duration-200 text-sm font-medium shadow-lg hover:shadow-xl"
        >
          <Download className="w-4 h-4" />
          Export CSV
        </button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <div className="bg-gradient-to-r from-emerald-50 to-blue-50 rounded-xl p-6 mb-4">
            <div className="text-sm font-medium text-slate-600 mb-1">Total Spent (Aug 2025)</div>
            <div className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
              ₦{totalSpent.toLocaleString()}
            </div>
          </div>
          
          {categoryTotals.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-slate-700 mb-3">Spending by Category</h3>
              <div className="space-y-2">
                {categoryTotals.map((category) => (
                  <div key={category.name} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{category.icon}</span>
                      <div>
                        <span className="text-sm font-medium text-slate-700">{category.name}</span>
                        <div className="text-xs text-slate-500">{category.percentage}% of total</div>
                      </div>
                    </div>
                    <div className="text-sm font-semibold text-slate-800">
                      ₦{category.total.toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
       <div className="flex items-center justify-center">
   {/* Spending Distribution (Chart + List) */}
      <SpendingDistribution categoryTotals={categoryTotals} />
</div>

      </div>
    </div>
  );
};

export default Summary;