import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const SpendingDistribution = ({ categoryTotals }) => {
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
    <div className="bg-white rounded-xl shadow p-4">
      <h3 className="text-sm font-semibold text-slate-700 mb-4 text-center">
        Spending Distribution
      </h3>


      <div className="flex flex-col md:flex-row items-center justify-center gap-6">
        {/* Pie Chart */}
        <div className="w-[280px] h-[280px] flex items-center justify-center">
            {
                categoryTotals.length > 0 ? 
                  <PieChart width={280} height={280}>
            <Pie
              data={categoryTotals}
              dataKey="total"    // numeric field for chart
              nameKey="name"    // category name
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
            <Legend />
          </PieChart> : "No data yet"
            }
        
        </div>

        {/* Category List */}
        <div className="grid grid-cols-1 gap-2 w-full max-w-xs">
          {categoryTotals.map((category, index) => (
            <div
              key={category.name}
              className="flex items-center gap-2 p-2 bg-white rounded-lg border border-slate-100 shadow-sm"
            >
              <div
                className={`w-3 h-3 rounded-full`}
                style={{ backgroundColor: colors[index % colors.length] }}
              ></div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-medium text-slate-700 truncate">
                  {category.name}
                </div>
                <div className="text-xs text-slate-500">
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
