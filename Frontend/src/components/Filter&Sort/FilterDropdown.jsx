import React, { useState, useEffect } from 'react';
import { SlidersHorizontal } from 'lucide-react';

const FilterDropdown = ({ filters, setFilters, onApply }) => {
  const [open, setOpen] = useState(false);

  // Local state to hold changes before applying
  const [localFilters, setLocalFilters] = useState(filters);

  // Sync localFilters with incoming filters when dropdown opens or filters change externally
  useEffect(() => {
    if (open) {
      setLocalFilters(filters);
    }
  }, [filters, open]);

  const toggleDropdown = () => setOpen(!open);

  const handleApply = () => {
    setFilters(localFilters);
    onApply?.();
    setOpen(false);
  };

  return (
    <div className="relative text-right">
      <button
        onClick={toggleDropdown}
        className="bg-[#555879] text-[#F4EBD3] px-4 py-2 rounded hover:bg-[#3e4059] transition flex items-center gap-2
          focus:outline-none focus:ring-2 focus:ring-[#555879]"
      >
        <SlidersHorizontal size={18} />
        {open ? 'Close Filters' : 'Filter'}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-64 bg-[#DED3C4] p-4 rounded-xl shadow-lg z-10 text-[#555879]">
          <h2 className="text-lg font-semibold mb-4 text-left">Filters</h2>

          <div className="mb-4 text-left">
            <label className="block mb-1 font-medium">Genre</label>
            <select
  value={localFilters.genre}
  onChange={(e) => setLocalFilters({ ...localFilters, genre: e.target.value })}
  className="w-full border border-[#aaa] rounded p-2 bg-[#F4EBD3] text-[#555879]
    focus:outline-none focus:ring-2 focus:ring-[#555879]"
>
  <option value="">All</option>
  <option value="28">Action</option>
  <option value="12">Adventure</option>
  <option value="16">Animation</option>
  <option value="35">Comedy</option>
  <option value="80">Crime</option>
  <option value="99">Documentary</option>
  <option value="18">Drama</option>
  <option value="10751">Family</option>
  <option value="14">Fantasy</option>
  <option value="36">History</option>
  <option value="27">Horror</option>
  <option value="10402">Music</option>
  <option value="9648">Mystery</option>
  <option value="10749">Romance</option>
  <option value="878">Science Fiction</option>
  <option value="10770">TV Movie</option>
  <option value="53">Thriller</option>
  <option value="10752">War</option>
  <option value="37">Western</option>
</select>
          </div>

          <div className="mb-4 text-left">
            <label className="block mb-1 font-medium">Minimum Rating</label>
            <input
              type="number"
              min="0"
              max="10"
              value={localFilters.rating}
              onChange={(e) => setLocalFilters({ ...localFilters, rating: e.target.value })}
              className="w-full border border-[#aaa] rounded p-2 bg-[#F4EBD3] text-[#555879]
                focus:outline-none focus:ring-2 focus:ring-[#555879]"
            />
          </div>

          <div className="mb-4 text-left">
            <label className="block mb-1 font-medium">Year</label>
            <input
              type="number"
              value={localFilters.year}
              onChange={(e) => setLocalFilters({ ...localFilters, year: e.target.value })}
              className="w-full border border-[#aaa] rounded p-2 bg-[#F4EBD3] text-[#555879]
                focus:outline-none focus:ring-2 focus:ring-[#555879]"
            />
          </div>

          <button
            onClick={handleApply}
            className="w-full bg-[#555879] text-[#F4EBD3] px-4 py-2 rounded hover:bg-[#3e4059] transition
              focus:outline-none focus:ring-2 focus:ring-[#555879]"
          >
            Apply Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default FilterDropdown;
