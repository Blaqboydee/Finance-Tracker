import React, { useState, useEffect } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { useOutletContext, NavLink, useNavigate } from 'react-router-dom';
import useDarkMode from "../hooks/useDarkMode";


const calcCategoryTotals = (expenses, categories) => {
  if (!expenses.length || !categories.length) return [];
  
  const totals = {};
  expenses.forEach(expense => {
    totals[expense.category] = (totals[expense.category] || 0) + expense.amount;
  });
  
  return Object.entries(totals).map(([name, total]) => ({ name, total }));
};

const categoryMap = {
  Entertainment: "Ent.",
  Transport: "Trans.",
  Food: "Fd",
  Shopping: "Shop",
  Healthcare: "Health"
};






const SpendlyDashboard = () => {
  const navigate = useNavigate()
  const [isDarkMode, setIsDarkMode] = useDarkMode();


  // Initialize from localStorage just once
  const [expenses, setExpenses] = useState(() => {
    return JSON.parse(localStorage.getItem("finance-tracker-expenses")) || [];
  });

  const [categories, setCategories] = useState(() => {
    return JSON.parse(localStorage.getItem("categories")) || [];
  });

  // Derived states
  const [totalExpense, setTotalExpense] = useState(0);
  const [highestAmount, setHighestAmount] = useState(0);
  const [highestCategory, setHighestCategory] = useState(null);

  // Slice + totals (no problem keeping these inline)
  const recentExpenses = expenses.slice(0, 3);
  const categoryTotals = calcCategoryTotals(expenses, categories);

  //  Calculate totals when expenses change
  useEffect(() => {
    if (expenses.length === 0) {
      setTotalExpense(0);
      setHighestAmount(0);
      setHighestCategory(null);
      return;
    }

    let total = 0;
    let highest = expenses[0];

    for (const t of expenses) {
      total += t.amount;
      if (t.amount > highest.amount) {
        highest = t;
      }
    }

    setTotalExpense(total);
    setHighestAmount(highest.amount);
    setHighestCategory(highest);
  }, [expenses]);

  // console.log(expenses);
  

  // Keep original biggest category logic (fallback safe)
  const biggestExpense = expenses.length > 0 ? expenses[0] : null;

  const colors = [
    "#3B82F6", // blue
    "#10B981", // green
    "#8B5CF6", // purple
    "#F97316", // orange
    "#EC4899", // pink
    "#6366F1", // indigo
  ];


  const [outerRadius, setOuterRadius] = useState(80);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) { // mobile
        setOuterRadius(50);
      } else if (window.innerWidth < 1024) { // tablet
        setOuterRadius(70);
      } else { // desktop
        setOuterRadius(100);
      }
    };

    handleResize(); // run on mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Empty state placeholder component
  const EmptyState = ({ title, description, icon }) => (
    <div className="flex flex-col items-center justify-center py-8 px-4 text-center">
      <div className={`text-6xl mb-4 opacity-50 ${isDarkMode ? "text-slate-600" : "text-slate-300"}`}>
        {icon}
      </div>
      <h3 className={`text-lg font-semibold mb-2 ${isDarkMode ? "text-slate-300" : "text-slate-600"}`}>
        {title}
      </h3>
      <p className={`text-sm ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>
        {description}
      </p>
    </div>
  );

  return (
   <div
  className={`min-h-full flex justify-center font-sans transition-colors duration-300 pt-2 ${
    isDarkMode ? "" : ""
  }`}
>
  <div className="w-full max-w-5xl">
    {/* Header */}
    <div
      className={`p-2 md:p-6 rounded-t-3xl border backdrop-blur-sm shadow-lg transition-all duration-300 ${
        isDarkMode
          ? "bg-slate-800 border-slate-700 text-slate-100 shadow-slate-900/20"
          : "bg-white border border-slate-200 text-slate-900 shadow-slate-200/20"
      }`}
    >
      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        {/* Total Expense */}
        <div
          className={`p-1 md:p-4 flex flex-col justify-center rounded-2xl border text-center transition-all duration-300 hover:scale-[1.02] ${
            isDarkMode
              ? "bg-gradient-to-br from-slate-700/60 to-slate-700/40 border-slate-600/50 hover:border-slate-500"
              : "bg-gradient-to-br from-white to-slate-50 border-slate-200/50 hover:border-slate-300 shadow-sm"
          }`}
        >
          <div
            className={`text-[11px] md:text-sm font-medium mb-1 ${
              isDarkMode ? "text-slate-400" : "text-slate-500"
            }`}
          >
            Total Expense
          </div>
          <div
            className={`md:text-2xl font-bold ${
              isDarkMode ? "text-white" : "text-slate-800"
            }`}
          >
            {totalExpense > 0 ? `₦ ${totalExpense.toLocaleString()}` : "₦0"}
          </div>
          {totalExpense === 0 && (
            <div
              className={`text-xs mt-1 ${
                isDarkMode ? "text-slate-500" : "text-slate-400"
              }`}
            >
              Start tracking expenses
            </div>
          )}
        </div>

        {/* Biggest Category */}
        <div
          className={`p-1 md:p-4 rounded-2xl border text-center transition-all duration-300 hover:scale-[1.02] ${
            isDarkMode
              ? "bg-gradient-to-br from-slate-700/60 to-slate-700/40 border-slate-600/50 hover:border-slate-500"
              : "bg-gradient-to-br from-white to-slate-50 border-slate-200/50 hover:border-slate-300 shadow-sm"
          }`}
        >
          <div
            className={`text-[11px] md:text-sm font-medium mb-1 ${
              isDarkMode ? "text-slate-400" : "text-slate-500"
            }`}
          >
            Biggest Category
          </div>
          {highestAmount ? (
            <>
              <div
                className={`text-sm md:text-lg font-bold ${
                  isDarkMode ? "text-white" : "text-slate-800"
                }`}
              >
                {highestCategory.category}
              </div>
              <div
                className={`text-sm ${
                  isDarkMode ? "text-slate-400" : "text-slate-500"
                }`}
              >
                ₦ {highestAmount.toLocaleString()}
              </div>
            </>
          ) : (
            <>
              <div
                className={`text-lg font-bold ${
                  isDarkMode ? "text-slate-500" : "text-slate-400"
                }`}
              >
                —
              </div>
              <div
                className={`text-xs mt-1 ${
                  isDarkMode ? "text-slate-600" : "text-slate-400"
                }`}
              >
                ₦0
              </div>
            </>
          )}
        </div>
      </div>
    </div>

    {/* Main Content */}
    <div
      className={`flex-1 p-6 border-x border-b rounded-b-3xl backdrop-blur-sm shadow-lg transition-all duration-300 ${
        isDarkMode
          ? "bg-slate-800/40 border-slate-700/50 shadow-slate-900/20"
          : "bg-white border border-slate-200 text-slate-900 shadow-slate-200/20"
      }`}
    >
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
          <h2
            className={`text-sm md:text-xl font-bold mb-4 ${
              isDarkMode ? "text-white" : "text-slate-800"
            }`}
          >
            Recent Expenses
          </h2>
          <div className="space-y-3">
            {recentExpenses.length > 0 ? (
              recentExpenses.map((expense, index) => (
                <div
                  key={index}
                  className={`flex items-center justify-between p-3 rounded-xl transition-all duration-200 hover:scale-[1.01] ${
                    isDarkMode
                      ? "bg-slate-700/30 hover:bg-slate-700/50"
                      : "bg-white/50 hover:bg-white/80 shadow-sm"
                  }`}
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
                      <div
                        className={`text-sm font-medium ${
                          isDarkMode ? "text-white" : "text-slate-800"
                        }`}
                      >
                        {expense.category}
                      </div>
                      <div
                        className={`text-[10px] md:text-sm ${
                          isDarkMode ? "text-slate-400" : "text-slate-500"
                        }`}
                      >
                        {expense.date}
                      </div>
                    </div>
                  </div>
                  <div
                    className={`text-sm font-bold ${
                      isDarkMode ? "text-white" : "text-slate-800"
                    }`}
                  >
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
          className={`w-full text-sm py-2 md:py-4 rounded-md md:rounded-2xl font-semibold mb-2 md:mb-4 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] hover:shadow-xl ${
            isDarkMode ? "bg-blue-600 text-white" : "bg-blue-600 text-white"
          }`}
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