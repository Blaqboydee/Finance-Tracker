import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const SpendingDistribution = ({ categoryTotals, isDarkMode }) => {
    // console.log(categoryTotals);
    
  const colors = [
    "#3B82F6", // blue-500
    "#10B981", // emerald-500
    "#8B5CF6", // purple-500
    "#F97316", // orange-500
    "#EC4899", // pink-500
    "#6366F1", // indigo-500
  ];

  return (
  <div
  className={`${
    isDarkMode ? "bg-slate-800" : "bg-white"
  } rounded-xl shadow p-4 w-[320px] md:w-[400px]`}
>
  <h3
    className={`text-sm font-semibold mb-4 text-center ${
      isDarkMode ? "text-slate-200" : "text-slate-700"
    }`}
  >
    Spending Distribution
  </h3>

  <div className="flex flex-col items-center justify-center gap-6">
    {/* Pie Chart */}
    <div className="w-[300px] h-[250px] flex items-center justify-center">
      {categoryTotals.length > 0 ? (
        <PieChart width={320} height={280}>
          <Pie
            data={categoryTotals}
            dataKey="total"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label
          >
            {categoryTotals.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={colors[index % colors.length]}
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      ) : (
        "No data yet"
      )}
    </div>

    {/* Category List */}
    <div className="flex gap-2 flex-wrap">
      {categoryTotals.map((category, index) => (
        <div
          key={category.name}
          className={`flex items-center gap-2 p-2 rounded-lg border shadow-sm ${
            isDarkMode
              ? "bg-slate-700 border-slate-600"
              : "bg-white border-slate-100"
          }`}
        >
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: colors[index % colors.length] }}
          ></div>
          <div className="flex-1 min-w-0">
            <div
              className={`text-xs font-medium truncate ${
                isDarkMode ? "text-slate-200" : "text-slate-700"
              }`}
            >
              {category.name}
            </div>
            <div
              className={`text-xs ${
                isDarkMode ? "text-slate-400" : "text-slate-500"
              }`}
            >
              {category.percentage}%
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</div>

  );
};

export default SpendingDistribution;
