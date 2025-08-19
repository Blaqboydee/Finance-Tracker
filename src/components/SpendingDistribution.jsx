import React, {useState, useEffect} from "react"
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const SpendingDistribution = ({ categoryTotals, totalSpent }) => {
  const [outerRadius, setOuterRadius] = useState(80);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) { // mobile
        setOuterRadius(60);
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
  className={``}
>
  <h3
    className={`text-sm font-semibold mb-4 text-center`}
  >
    Spending Distribution
  </h3>

  <div className="flex flex-col items-center justify-center gap-6">
    {/* Pie Chart */}
    <div className="w-[300px] h-[200px] flex items-center justify-center">
      {categoryTotals.length > 0 ? (
        <PieChart width={320} height={280}>
          <Pie
            data={categoryTotals}
            dataKey="total"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={outerRadius}
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
          className={`flex items-center gap-2 p-2 rounded-lg border shadow-sm `}
        >
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: colors[index % colors.length] }}
          ></div>
          <div className="flex-1 min-w-0">
            <div
              className={`text-xs font-medium truncate `}
            >
              {category.name}
            </div>
            <div
              className={`text-xs`}
            >
              <p className="text-xs md:text-sm">
  {((category.total / totalSpent) * 100).toFixed(1)}% of total
</p>
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
