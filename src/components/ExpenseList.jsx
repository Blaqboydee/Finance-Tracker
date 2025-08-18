import React from 'react';
import { Trash2, PieChart } from 'lucide-react';

const ExpenseList = ({ expenses, onDeleteExpense, isDarkMode }) => {
  return (
  <div
  className={`rounded-lg shadow-xl mb-6 p-6 border transition-colors duration-300
    ${isDarkMode 
      ? "bg-slate-800 border-slate-700 text-slate-100" 
      : "bg-white border-slate-200 text-slate-900"
    }`}
>
  <h2
    className={`text-lg font-semibold mb-6 flex items-center gap-2
      ${isDarkMode ? "text-slate-200" : "text-slate-800"}`}
  >
    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
    Expense List
  </h2>

  <div className="space-y-3">
    {expenses.length === 0 ? (
      <div
        className={`text-center py-12 
          ${isDarkMode ? "text-slate-500" : "text-slate-400"}`}
      >
        <div
          className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4
            ${isDarkMode ? "bg-slate-700" : "bg-slate-100"}`}
        >
          <PieChart className="w-8 h-8" />
        </div>
        <p>No expenses found</p>
      </div>
    ) : (
      expenses.map((expense) => (
        <div
          key={expense.id}
          className={`flex items-center justify-between p-1 md:p-4 border hover:shadow-md transition-all duration-200 group
            ${isDarkMode
              ? "bg-gradient-to-r from-slate-700 to-slate-800 border-slate-600"
              : "bg-gradient-to-r from-slate-50 to-white border-slate-100"
            }`}
        >
          <div className="flex items-center gap-4 flex-1">
            <div
              className={`w-6 h-6 md:w-12 md:h-12 flex items-center justify-center md:text-xl
                ${isDarkMode
                  ? "bg-gradient-to-br from-blue-900/30 to-emerald-900/30"
                  : "bg-gradient-to-br from-blue-50 to-emerald-50"
                }`}
            >
              {expense.icon}
            </div>
            <div className="flex-1">
              <div
                className={`font-semibold text-sm md:text-lg
                  ${isDarkMode ? "text-slate-200" : "text-slate-800"}`}
              >
                {expense.category}
              </div>
              <div
                className={`text-[11px] md:text-sm 
                  ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}
              >
                {expense.description}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="text-right">
              <div
                className={`font-bold text-sm md:text-lg 
                  ${isDarkMode ? "text-slate-200" : "text-slate-800"}`}
              >
                ₦{expense.amount.toLocaleString()}
              </div>
              <div
                className={`text-[11px] md:text-sm 
                  ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}
              >
                {expense.date}
              </div>
            </div>
            <button
              onClick={() => onDeleteExpense(expense.id)}
              className={`pr-2 md:p-4 rounded-lg transition-all duration-200 opacity-0 group-hover:opacity-100
                ${isDarkMode 
                  ? "text-slate-500 hover:bg-red-900/20" 
                  : "text-slate-400 hover:bg-red-50"} hover:text-red-500`}
              aria-label={`Delete ${expense.category} expense`}
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      ))
    )}
  </div>
</div>

  );
};

export default ExpenseList;