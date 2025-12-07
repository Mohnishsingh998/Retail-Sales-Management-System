// src/components/FilterDropdown.jsx
import React from "react";
import { ChevronDown } from "lucide-react";

const FilterDropdown = ({
  title,
  options = [],
  category,
  selectedValues = [],
  onToggle,
  isOpen,
  onToggleOpen,
}) => (
  <div className="relative">
    {/* FILTER BUTTON */}
    <button
      onClick={onToggleOpen}
      className="px-4 py-2 bg-[#F2F4F7] border border-[#D0D5DD] rounded-lg flex items-center gap-2 text-sm text-gray-700 font-medium hover:bg-[#EAECF0] transition-colors"
    >
      {title}

      {/* SELECTED COUNT BADGE */}
      {selectedValues.length > 0 && (
        <span className="px-2 py-0.5 bg-blue-100 text-blue-800 text-xs rounded-full font-semibold">
          {selectedValues.length}
        </span>
      )}

      <ChevronDown className="w-4 h-4 text-gray-700" />
    </button>

    {/* DROPDOWN PANEL */}
    {isOpen && (
      <div className="absolute left-0 mt-2 bg-white border border-[#D0D5DD] rounded-lg shadow-lg z-20 min-w-[220px] max-h-[280px] overflow-y-auto">
        {options.map((opt) => (
          <label
            key={opt}
            className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-100 transition"
          >
            <input
              type="checkbox"
              checked={selectedValues.includes(opt)}
              onChange={() => onToggle(category, opt)}
              className="mr-2 accent-blue-600"
            />
            <span className="text-sm text-gray-800">{opt}</span>
          </label>
        ))}
      </div>
    )}
  </div>
);

export default FilterDropdown;
