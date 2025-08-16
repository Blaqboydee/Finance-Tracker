import React from 'react';
import { ChevronDown, Calendar } from 'lucide-react';

const Filter = ({ filterCategory, setFilterCategory, categories, dateRange, setDateRange }) => {
  const dateRangeOptions = [
    { label: 'All Time', value: 'all' },
    { label: 'This Month', value: 'thisMonth' },
    { label: 'Last 30 Days', value: 'last30' },
    { label: 'This Year', value: 'thisYear' },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-xl mb-6 p-6 border border-slate-200">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold text-slate-700 uppercase tracking-wide">Filter:</span>
          <div className="relative">
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-slate-50 hover:bg-white appearance-none cursor-pointer pr-10"
            >
              <option>All Categories</option>
              {categories.map(category => (
                <option key={category.name} value={category.name}>
                  {category.icon} {category.name}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold text-slate-700 uppercase tracking-wide">Period:</span>
          <div className="relative">
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-slate-50 hover:bg-white appearance-none cursor-pointer pr-10"
            >
              {dateRangeOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filter;