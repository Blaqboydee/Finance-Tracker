import React from 'react';
import { PieChart, Download } from 'lucide-react';
import SpendingDistribution from "../components/SpendingDistribution"

const Summary = ({ expenses, categories,isDarkMode }) => {
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

  // Sort categories by highest total
  categoryTotals.sort((a, b) => b.total - a.total);

  const exportToCSV = () => {
    const headers = ['Date', 'Category', 'Description', 'Amount'];
    const csvContent = [
      headers.join(','),
      ...expenses.map(expense => [
        expense.date,
        expense.category,
        `"${expense.description}"`,
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
   <div
  className={`${
    isDarkMode ? "bg-slate-800 border-slate-700" : "bg-white border-slate-200"
  } rounded-lg shadow-xl p-6`}
>
  {/* Header */}
  <div className="flex items-center justify-between mb-6">
    <h2
      className={`text-lg font-semibold flex items-center gap-2 ${
        isDarkMode ? "text-slate-200" : "text-slate-800"
      }`}
    >
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

  {/* Content */}
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
    {/* Left side */}
    <div>
      <div
        className={`bg-gradient-to-r rounded-xl p-6 mb-4 ${
          isDarkMode
            ? "from-emerald-900/20 to-blue-900/20"
            : "from-emerald-50 to-blue-50"
        }`}
      >
        <div
          className={`text-sm font-medium mb-1 ${
            isDarkMode ? "text-slate-400" : "text-slate-600"
          }`}
        >
          Total Spent (Aug 2025)
        </div>
        <div
          className={`text-3xl font-bold bg-gradient-to-r bg-clip-text text-transparent ${
            isDarkMode
              ? "from-emerald-400 to-blue-400"
              : "from-emerald-600 to-blue-600"
          }`}
        >
          ₦{totalSpent.toLocaleString()}
        </div>
      </div>

      {categoryTotals.length > 0 && (
        <div>
          <h3
            className={`text-sm font-semibold mb-3 ${
              isDarkMode ? "text-slate-300" : "text-slate-700"
            }`}
          >
            Spending by Category
          </h3>
          <div className="space-y-2">
            {categoryTotals.map((category) => (
              <div
                key={category.name}
                className={`flex items-center justify-between p-3 rounded-lg transition-colors ${
                  isDarkMode
                    ? "bg-slate-700 hover:bg-slate-600"
                    : "bg-slate-50 hover:bg-slate-100"
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-lg">{category.icon}</span>
                  <div>
                    <span
                      className={`text-sm font-medium ${
                        isDarkMode ? "text-slate-300" : "text-slate-700"
                      }`}
                    >
                      {category.name}
                    </span>
                    <div
                      className={`text-xs ${
                        isDarkMode ? "text-slate-400" : "text-slate-500"
                      }`}
                    >
                      {category.percentage}% of total
                    </div>
                  </div>
                </div>
                <div
                  className={`text-sm font-semibold ${
                    isDarkMode ? "text-slate-200" : "text-slate-800"
                  }`}
                >
                  ₦{category.total.toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>


    {/* Right side */}
    <div className="flex items-center justify-center">
      {categoryTotals.length > 0 ? (
             <SpendingDistribution categoryTotals={categoryTotals} isDarkMode={isDarkMode}/>
      ) : (
        <div
          className={`w-48 h-48 rounded-full flex items-center justify-center bg-gradient-to-br ${
            isDarkMode ? "from-slate-700 to-slate-800" : "from-slate-100 to-blue-100"
          }`}
        >
          <div className="text-center">
            <PieChart className="w-16 h-16 mx-auto text-slate-400 mb-2" />
            <div
              className={`text-sm ${
                isDarkMode ? "text-slate-300" : "text-slate-500"
              }`}
            >
              No Data Yet
            </div>
            <div className="text-xs text-slate-400">
              Add expenses to see chart
            </div>
          </div>
        </div>
      )}
    </div>
  </div>
</div>

  );
};

export default Summary;
