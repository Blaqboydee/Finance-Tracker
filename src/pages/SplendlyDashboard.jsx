import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { useNavigate } from "react-router-dom";
import useExpenseTracker from '../hooks/useExpenseTracker'; // Adjust import path as needed

const SpendlyDashboard = () => {
  const navigate = useNavigate();

    // Component for empty states
  const EmptyState = ({ title, description, icon }) => (
    <div className="flex flex-col items-center justify-center py-8 px-4 text-center">
      <div className="text-6xl mb-4 opacity-50 text-slate-300 dark:text-slate-600">
        {icon}
      </div>
      <h3 className="text-lg font-semibold mb-2 text-slate-600 dark:text-slate-300">
        {title}
      </h3>
      <p className="text-sm text-slate-500 dark:text-slate-400">{description}</p>
    </div>
  );
  
  const {
    expenses,
    categories,
    totalExpense,
    highestAmount,
    highestCategory,
    outerRadius,
    recentExpenses,
    categoryTotals,
    colors,
    categoryMap,
    // EmptyState
  } = useExpenseTracker();

  return (
    <div className="min-h-full flex justify-center font-sans transition-colors duration-300 pt-2">
      <div className="w-full max-w-5xl">
        {/* Dashboard Header */}
        <div className="p-3 md:p-4 mb-2 rounded-2xl border backdrop-blur-sm shadow-md transition-all duration-300 bg-gradient-to-r  dark:from-slate-700/80 dark:to-slate-600/80 border-blue-200/60 dark:border-slate-600/60 text-slate-900 dark:text-slate-100">
          <div className="flex items-center justify-center gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            <h1 className="text-lg md:text-2xl font-bold dark:text-white text-black">
              Your Dashboard
            </h1>
          </div>
          <p className="text-center text-xs md:text-sm text-slate-600 dark:text-slate-300 mt-1">
            Track your expenses and manage your budget
          </p>
        </div>

        {/* Header */}
        <div className="p-2 md:p-6 rounded-t-3xl border backdrop-blur-sm shadow-lg transition-all duration-300 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100">
          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            {/* Total Expense */}
            <div className="p-1 md:p-4 flex flex-col justify-center rounded-2xl border text-center transition-all duration-300 hover:scale-[1.02] bg-gradient-to-br from-white to-slate-50 dark:from-slate-700/60 dark:to-slate-700/40 border-slate-200/50 dark:border-slate-600/50 hover:border-slate-300 dark:hover:border-slate-500 shadow-sm">
              <div className="text-[11px] md:text-sm font-medium mb-1 text-slate-500 dark:text-slate-400">
                Total Expense
              </div>
              <div className="md:text-2xl font-bold text-slate-800 dark:text-white">
                {totalExpense > 0 ? `₦ ${totalExpense.toLocaleString()}` : "₦0"}
              </div>
              {totalExpense === 0 && (
                <div className="text-xs mt-1 text-slate-400 dark:text-slate-500">
                  Start tracking expenses
                </div>
              )}
            </div>

            {/* Biggest Category */}
            <div className="p-1 md:p-4 rounded-2xl border text-center transition-all duration-300 hover:scale-[1.02] bg-gradient-to-br from-white to-slate-50 dark:from-slate-700/60 dark:to-slate-700/40 border-slate-200/50 dark:border-slate-600/50 hover:border-slate-300 dark:hover:border-slate-500 shadow-sm">
              <div className="text-[11px] md:text-sm font-medium mb-1 text-slate-500 dark:text-slate-400">
                Biggest Category
              </div>
              {highestAmount ? (
                <>
                  <div className="text-sm md:text-lg font-bold text-slate-800 dark:text-white">
                    {highestCategory.category}
                  </div>
                  <div className="text-sm text-slate-500 dark:text-slate-400">
                    ₦ {highestAmount.toLocaleString()}
                  </div>
                </>
              ) : (
                <>
                  <div className="text-lg font-bold text-slate-400 dark:text-slate-500">
                    —
                  </div>
                  <div className="text-xs mt-1 text-slate-400 dark:text-slate-600">
                    ₦0
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6 border-x border-b rounded-b-3xl backdrop-blur-sm shadow-lg transition-all duration-300 bg-white dark:bg-slate-800/40 border-slate-200 dark:border-slate-700/50 text-slate-900 dark:text-slate-100">
          {/* Chart + Recent Expenses */}
          <div className="flex flex-col lg:flex-row lg:justify-between items-start gap-6 mb-8">
            {/* Chart Section */}
            <div className="h-48 w-full lg:w-1/2 md:h-80">
              {categoryTotals.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryTotals}
                      dataKey="total"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={outerRadius}
                      label={({ name, percent }) =>
                        `${categoryMap[name] || name} ${(percent * 100).toFixed(0)}%`
                      }
                    >
                      {categoryTotals.map((_, index) => (
                        <Cell
                          key={index}
                          fill={colors[index % colors.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value) => [
                        `₦${value.toLocaleString()}`,
                        "Amount",
                      ]}
                    />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex items-center justify-center">
                  <EmptyState
                    icon="📊"
                    title="No Data"
                    description="Your spending chart will appear here once you add expenses"
                  />
                </div>
              )}
            </div>

            {/* Recent Expenses */}
            <div className="w-full md:w-1/2">
              <h2 className="text-sm md:text-xl font-bold mb-4 text-slate-800 dark:text-white">
                Recent Expenses
              </h2>
              <div className="space-y-3">
                {recentExpenses.length > 0 ? (
                  recentExpenses.map((expense, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 rounded-xl transition-all duration-200 hover:scale-[1.01] bg-white/50 dark:bg-slate-700/30 hover:bg-white/80 dark:hover:bg-slate-700/50 shadow-sm"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-3 h-3 rounded-full ${
                            expense.category === "Food"
                              ? "bg-red-400"
                              : expense.category === "Transport"
                              ? "bg-blue-400"
                              : expense.category === "Entertainment"
                              ? "bg-purple-400"
                              : "bg-green-400"
                          }`}
                        />
                        <div>
                          <div className="text-sm font-medium text-slate-800 dark:text-white">
                            {expense.category}
                          </div>
                          <div className="text-[10px] md:text-sm text-slate-500 dark:text-slate-400">
                            {expense.date}
                          </div>
                        </div>
                      </div>
                      <div className="text-sm font-bold text-slate-800 dark:text-white">
                        ₦ {expense.amount.toLocaleString()}
                      </div>
                    </div>
                  ))
                ) : (
                  <EmptyState
                    icon="💸"
                    title="No Expenses Yet"
                    description="Start by adding your first expense to see it here"
                  />
                )}
              </div>
            </div>
          </div>

          {/* Add Expense Button */}
          <div className="w-auto text-center">
            <button
             onClick={() => navigate("/expenses")}
              className="w-full text-sm py-2 md:py-4 rounded-md md:rounded-2xl font-semibold mb-2 md:mb-4 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] hover:shadow-xl bg-blue-600 text-white"
            >
              + Add Expense
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpendlyDashboard;