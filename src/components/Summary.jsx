import React from "react";
import { PieChart, Download } from "lucide-react";
import SpendingDistribution from "../components/SpendingDistribution";
// import { calcCategoryTotals } from "../utils/calcCategoryTotals";

const calcCategoryTotals = (expenses, categories) => {
  if (!expenses.length || !categories.length) return [];
  
  const totals = {};
  expenses.forEach(expense => {
    totals[expense.category] = (totals[expense.category] || 0) + expense.amount;
  });
  
  return Object.entries(totals).map(([name, total]) => ({ name, total }));
};

const Summary = ({ expenses, categories }) => {
  const categoryTotals = calcCategoryTotals(expenses, categories);
  const totalSpent = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  //  console.log(totalSpent);
  // console.log(categoryTotals);
  // console.log(categories);
  

  const exportToCSV = () => {
    const headers = ["Date", "Category", "Description", "Amount"];
    const csvContent = [
      headers.join(","),
      ...expenses.map((expense) =>
        [
          expense.date,
          expense.category,
          `"${expense.description}"`,
          expense.amount,
        ].join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `finance-tracker-${
      new Date().toISOString().split("T")[0]
    }.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-full min-h-full flex flex-col">
      {/* Header - Fixed at top of content */}
      <div className="sticky top-0 z-10 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 px-4 py-3 md:py-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg md:text-xl font-semibold flex items-center gap-2 text-slate-800 dark:text-white">
            <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
            Summary
          </h2>
          <button
            onClick={exportToCSV}
            className="flex items-center gap-2 px-3 py-2 md:px-4 md:py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl hover:from-blue-600 hover:to-indigo-600 transition-all duration-200 text-xs md:text-sm font-medium shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <Download className="w-3 h-3 md:w-4 md:h-4" />
            <span className="hidden sm:inline">Export</span> CSV
          </button>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 px-4 py-4 md:py-6">
        <div className="max-w-7xl mx-auto">
          {/* Total Spent Card */}
          <div className="bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-700 rounded-2xl px-4 py-4 md:px-6 md:py-6 mb-6 border border-slate-200 dark:border-slate-600 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
              <div className="text-sm md:text-base font-medium text-slate-600 dark:text-slate-300">
                Total Spent ({new Date().toLocaleString("en-US", { month: "short", year: "numeric" })})
              </div>
              <div className="text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                ₦{totalSpent.toLocaleString()}
              </div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {/* Left Column - Category List */}
            <div className="order-2 lg:order-1">
              {categoryTotals.length > 0 ? (
                <div className="w-full">
                  <h3 className="text-lg md:text-xl font-semibold mb-4 pb-2 border-b-2 border-slate-300 dark:border-slate-600 text-slate-800 dark:text-white">
                    Spending by Category
                  </h3>

                  <div className="space-y-3">
                    {categoryTotals.map((category) => (
                      <div
                        key={category.name}
                        className="flex items-center justify-between p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all duration-200 hover:scale-[1.01]"
                      >
                        {/* Left side: Icon + Text */}
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                          <span className="text-xl flex-shrink-0">{category.icon}</span>
                          <div className="min-w-0 flex-1">
                            <p className="text-sm md:text-base font-medium text-slate-800 dark:text-white truncate">
                              {category.name}
                            </p>
                            <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400">
                              {((category.total / totalSpent) * 100).toFixed(1)}% of total
                            </p>
                          </div>
                        </div>

                        {/* Right side: Amount */}
                        <div className="text-sm md:text-base font-semibold text-slate-800 dark:text-white flex-shrink-0 ml-2">
                          ₦{category.total.toLocaleString()}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center">
                    <PieChart className="w-8 h-8 text-slate-400" />
                  </div>
                  <h3 className="text-lg font-medium text-slate-600 dark:text-slate-300 mb-2">
                    No Categories Yet
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Add some expenses to see your spending breakdown
                  </p>
                </div>
              )}
            </div>

            {/* Right Column - Chart */}
            <div className="order-1 lg:order-2 flex items-center justify-center">
              {categoryTotals.length > 0 ? (
                <div className="w-full max-w-md">
                  <SpendingDistribution categoryTotals={categoryTotals} totalSpent={totalSpent}/>
                </div>
              ) : (
                <div className="w-48 h-48 md:w-64 md:h-64 rounded-full flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800 border border-slate-200 dark:border-slate-600">
                  <div className="text-center">
                    <PieChart className="w-12 h-12 md:w-16 md:h-16 mx-auto text-slate-400 mb-3" />
                    <div className="text-sm md:text-base font-medium text-slate-600 dark:text-slate-300 mb-1">
                      No Data Yet
                    </div>
                    <div className="text-xs md:text-sm text-slate-400">
                      Add expenses to see chart
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Summary