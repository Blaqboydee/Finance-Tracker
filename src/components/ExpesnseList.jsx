import React from 'react';
import { Trash2, PieChart } from 'lucide-react';

const ExpenseList = ({ expenses, onDeleteExpense }) => {
  return (
    <div className="bg-white rounded-2xl shadow-xl mb-6 p-6 border border-slate-200">
      <h2 className="text-lg font-semibold text-slate-800 mb-6 flex items-center gap-2">
        <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
        Expense List
      </h2>
      
      <div className="space-y-3">
        {expenses.length === 0 ? (
          <div className="text-center py-12 text-slate-400">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <PieChart className="w-8 h-8" />
            </div>
            <p>No expenses found</p>
          </div>
        ) : (
          expenses.map((expense) => (
            <div key={expense.id} className="flex items-center justify-between p-4 bg-gradient-to-r from-slate-50 to-white border border-slate-100 rounded-xl hover:shadow-md transition-all duration-200 group">
              <div className="flex items-center gap-4 flex-1">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-50 to-emerald-50 rounded-xl flex items-center justify-center text-xl">
                  {expense.icon}
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-slate-800">{expense.category}</div>
                  <div className="text-sm text-slate-500">{expense.description}</div>
                </div>
              </div>
              
              <div className="flex items-center gap-6">
                <div className="text-right">
                  <div className="font-bold text-lg text-slate-800">₦{expense.amount.toLocaleString()}</div>
                  <div className="text-sm text-slate-500">{expense.date}</div>
                </div>
                <button
                  onClick={() => onDeleteExpense(expense.id)}
                  className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all duration-200 opacity-0 group-hover:opacity-100"
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