import React from 'react';
import { ChevronDown, Calendar } from 'lucide-react';

const Filter = ({ filterCategory, setFilterCategory, categories, dateRange, setDateRange, setDescription }) => {
  const dateRangeOptions = [
    { label: 'All Time', value: 'all' },
    { label: 'This Month', value: 'thisMonth' },
    { label: 'Last 30 Days', value: 'last30' },
    { label: 'This Year', value: 'thisYear' },
  ];

  return (
    <div className="rounded-lg shadow-xl mb-6 p-6 border transition-colors
                    bg-white border-slate-200
                    dark:bg-slate-800 dark:border-slate-700">
      <div className="flex flex-col md:flex-row md:flex-wrap items-start md:items-center gap-4">
        
        {/* Filter by Category */}
        <div className="flex items-center gap-2 md:gap-3">
          <span className="text-base md:text-sm font-semibold uppercase tracking-wide
                           text-slate-700 dark:text-slate-300">
            Filter:
          </span>
          <div className="relative">
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-3 md:px-4 py-2 text-base md:text-sm rounded-md outline-none 
                         focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all 
                         appearance-none cursor-pointer pr-8 md:pr-10
                         bg-slate-50 border-slate-200 text-slate-900 hover:bg-white
                         dark:bg-slate-700 dark:border-slate-600 dark:text-slate-100 dark:hover:bg-slate-600"
            >
              <option>All Categories</option>
              {categories.map((category) => (
                <option key={category.name} value={category.name}>
                  {category.icon} {category.name}
                </option>
              ))}
            </select>
            <ChevronDown
              className="absolute right-2 md:right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 pointer-events-none
                         text-slate-400 dark:text-slate-500"
            />
          </div>
        </div>

        {/* Filter by Period */}
        <div className="flex items-center gap-2 md:gap-3">
          <span className="text-base md:text-sm font-semibold uppercase tracking-wide
                           text-slate-700 dark:text-slate-300">
            Period:
          </span>
          <div className="relative">
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="px-3 md:px-4 py-2 text-base md:text-sm rounded-md outline-none 
                         focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all 
                         appearance-none cursor-pointer pr-8 md:pr-10
                         bg-slate-50 border-slate-200 text-slate-900 hover:bg-white
                         dark:bg-slate-700 dark:border-slate-600 dark:text-slate-100 dark:hover:bg-slate-600"
            >
              {dateRangeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <Calendar
              className="absolute right-2 md:right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 pointer-events-none
                         text-slate-400 dark:text-slate-500"
            />
          </div>
        </div>

        {/* Search by Description */}
        <div className="flex items-center gap-2 md:gap-3 flex-1">
          <span className="text-base md:text-sm font-semibold uppercase tracking-wide
                           text-slate-700 dark:text-slate-300">
            Search:
          </span>
          <input
            type="text"
            placeholder="Search by description"
            onChange={(e) => setDescription(e.target.value)}
            className="flex-1 px-3 md:px-4 py-2 text-base md:text-sm rounded-md outline-none 
                       focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all 
                       placeholder:italic
                       bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-500 hover:bg-white
                       dark:bg-slate-700 dark:border-slate-600 dark:text-slate-100 dark:placeholder-slate-400 dark:hover:bg-slate-600"
          />
        </div>

      </div>
    </div>
  );
};

export default Filter;
