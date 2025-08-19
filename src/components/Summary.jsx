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
    <div className="px-4 mt-24">
      {/* Header */}
      <div className="flex items-center justify-between mb-3 md:mb-6 ">
        <h2 className={`text-lg font-semibold flex items-center gap-2 `}>
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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Left side */}
        <div>
          <div
            className={`flex justify-between items-center rounded-xl px-3 py-2 md:p-6 mb-4  border border-gray-700`}
          >
            <div className="text-sm font-medium">
  Total Spent ({new Date().toLocaleString("en-US", { month: "short", year: "numeric" })})
</div>

            <div
              className={`md:text-3xl font-bold bg-gradient-to-r bg-clip-text`}
            >
              ₦ {totalSpent.toLocaleString()}
            </div>
          </div>

          {categoryTotals.length > 0 && (
            <div className="w-full max-w-md mx-auto">
              <h3 className="text-base md:text-lg font-semibold mb-4 border-b-2 pb-1 border-slate-400 dark:border-slate-600">
                Spending by Category
              </h3>

              <div className="space-y-3">
                {categoryTotals.map((category) => (
                  <div
                    key={category.name}
                    className="flex items-center justify-between p-3 rounded-xl  shadow hover:shadow-lg transition duration-200"
                  >
                    {/* Left side: Icon + Text */}
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{category.icon}</span>
                      <div>
                        <p className="text-sm md:text-base font-medium">
                          {category.name}
                        </p>
                      <p className="text-xs md:text-sm">
  {((category.total / totalSpent) * 100).toFixed(1)}% of total
</p>

                      </div>
                    </div>

                    {/* Right side: Amount */}
                    <div className="text-sm md:text-base font-semibold">
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
            <SpendingDistribution categoryTotals={categoryTotals} totalSpent={totalSpent}/>
          ) : (
            <div
              className={`w-48 h-48 rounded-full flex items-center justify-center bg-gradient-to-br`}
            >
              <div className="text-center">
                <PieChart className="w-16 h-16 mx-auto text-slate-400 mb-2" />
                <div className={`text-sm`}>No Data Yet</div>
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
