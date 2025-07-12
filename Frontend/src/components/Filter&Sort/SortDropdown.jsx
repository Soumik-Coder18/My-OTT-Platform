import React, { useState, useEffect } from 'react';
import { ArrowUpDown } from 'lucide-react';

const SortDropdown = ({ sortOption, setSortOption, onApply, type = 'movie' }) => {
  const [open, setOpen] = useState(false);
  const [localSortOption, setLocalSortOption] = useState(sortOption);

  const toggleDropdown = () => setOpen(!open);

  // Sync local state with prop when dropdown opens or sortOption changes externally
  useEffect(() => {
    if (open) {
      setLocalSortOption(sortOption);
    }
  }, [open, sortOption]);

  // Options based on type
  const options = type === 'series'
    ? [
        { value: '', label: 'Default' },
        { value: 'popularity.desc', label: 'Popularity Descending' },
        { value: 'popularity.asc', label: 'Popularity Ascending' },
        { value: 'first_air_date.desc', label: 'First Air Date Descending' },
        { value: 'first_air_date.asc', label: 'First Air Date Ascending' },
        { value: 'vote_average.desc', label: 'Rating Descending' },
        { value: 'vote_average.asc', label: 'Rating Ascending' },
      ]
    : [
        { value: '', label: 'Default' },
        { value: 'popularity.desc', label: 'Popularity Descending' },
        { value: 'popularity.asc', label: 'Popularity Ascending' },
        { value: 'release_date.desc', label: 'Release Date Descending' },
        { value: 'release_date.asc', label: 'Release Date Ascending' },
        { value: 'vote_average.desc', label: 'Rating Descending' },
        { value: 'vote_average.asc', label: 'Rating Ascending' },
      ];

  const handleApply = () => {
    setSortOption(localSortOption);
    onApply?.();
    setOpen(false);
  };

  return (
    <div className="relative text-right">
      <button
        onClick={toggleDropdown}
        className="bg-[#2E004F] text-[#FFFFFF] px-4 py-2 rounded hover:bg-[#4A004E] transition flex items-center gap-2
          focus:outline-none focus:ring-2 focus:ring-[#2E004F]"
      >
        <ArrowUpDown size={18} />
        {open ? 'Close Sort' : 'Sort'}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-[#EBA9FF] p-4 rounded-xl shadow-lg z-10 text-[#2E004F]">
          <h2 className="text-lg font-semibold mb-4 text-left">Sort By</h2>

          <select
            value={localSortOption}
            onChange={(e) => setLocalSortOption(e.target.value)}
            className="w-full border border-[#7D4C9E] rounded p-2 bg-[#F9D1F5] text-[#2E004F]
              focus:outline-none focus:ring-2 focus:ring-[#2E004F]"
          >
            {options.map(({ value, label }) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>

          <button
            onClick={handleApply}
            className="w-full bg-[#2E004F] text-[#FFFFFF] px-4 py-2 rounded hover:bg-[#4A004E] transition mt-4
              focus:outline-none focus:ring-2 focus:ring-[#2E004F]"
          >
            Apply Sort
          </button>
        </div>
      )}
    </div>
  );
};

export default SortDropdown;
