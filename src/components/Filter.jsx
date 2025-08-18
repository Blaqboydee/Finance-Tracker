import React from 'react';
import { ChevronDown, Calendar } from 'lucide-react';

const Filter = ({ filterCategory, setFilterCategory, categories, dateRange, setDateRange, isDarkMode, setDescription }) => {
  const dateRangeOptions = [
    { label: 'All Time', value: 'all' },
    { label: 'This Month', value: 'thisMonth' },
    { label: 'Last 30 Days', value: 'last30' },
    { label: 'This Year', value: 'thisYear' },
  ];

 

  return (
  <div
  className={`rounded-lg shadow-xl mb-6 p-6 border transition-colors ${
    isDarkMode
      ? "bg-slate-800 border-slate-700"
      : "bg-white border-slate-200"
  }`}
>
  <div className="flex flex-col sm:flex-row md:flex-row flex-wrap  items-start sm:items-center gap-4">
    {/* Filter */}
    <div className="flex items-center gap-3">
      <span
        className={`text-sm font-semibold uppercase tracking-wide ${
          isDarkMode ? "text-slate-300" : "text-slate-700"
        }`}
      >
        Filter:
      </span>
      <div className="relative">
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className={`px-4 outline-none py-2  focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none cursor-pointer pr-10 ${
            isDarkMode
              ? "bg-slate-700 border-slate-600 text-slate-100 hover:bg-slate-600"
              : "bg-slate-50 border-slate-200 text-slate-900 hover:bg-white"
          }`}
        >
          <option>All Categories</option>
          {categories.map((category) => (
            <option key={category.name} value={category.name}>
              {category.icon} {category.name}
            </option>
          ))}

        </select>
        <ChevronDown
          className={`absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 pointer-events-none ${
            isDarkMode ? "text-slate-500" : "text-slate-400"
          }`}
        />
      </div>
    </div>

    {/* Period */}
    <div className="flex items-center gap-3">
      <span
        className={`text-sm font-semibold uppercase tracking-wide ${
          isDarkMode ? "text-slate-300" : "text-slate-700"
        }`}
      >
        Period:
      </span>
      <div className="relative">
        <select
          value={dateRange}
          onChange={(e) => setDateRange(e.target.value)}
          className={`px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none cursor-pointer pr-10 ${
            isDarkMode
              ? "bg-slate-700 border-slate-600 text-slate-100 hover:bg-slate-600"
              : "bg-slate-50 border-slate-200 text-slate-900 hover:bg-white"
          }`}
        >
          {dateRangeOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <Calendar
          className={`absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 pointer-events-none ${
            isDarkMode ? "text-slate-500" : "text-slate-400"
          }`}
        />
      </div>
    </div>


    <div className='flex items-center gap-3'>
       <span
        className={`text-sm font-semibold uppercase tracking-wide ${
          isDarkMode ? "text-slate-300" : "text-slate-700"
        }`}
      >
        SEARCH:
      </span>
     <input
     onChange={(e)=>setDescription(e)}
  type="text"
  placeholder="Search by description"
  className={`px-4 py-2 w-[80%]  outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none cursor-pointer pr-10
    ${
      isDarkMode
        ? "bg-slate-700 border-slate-600 text-slate-100 hover:bg-slate-600 placeholder-slate-300"
        : "bg-slate-50 border-slate-200 text-slate-900 hover:bg-white placeholder-slate-500"
    }`}
/>

    </div>
  </div>
</div>


  );
};

export default Filter;