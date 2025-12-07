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
  <div className="relative dropdown-wrapper whitespace-nowrap">
    {/* BUTTON */}
    <button
      onClick={onToggleOpen}
      className="px-1  h-[26px] bg-[#F2F4F7] border border-[#D0D5DD] rounded-sm inline-flex items-center justify-between gap-2 text-xs text-gray-700 font-medium hover:bg-[#EAECF0] transition-colors whitespace-nowrap shrink-0"
    >
      <span className="whitespace-nowrap font-normal">{title}</span>

      <ChevronDown className="w-4 h-4 text-gray-700 shrink-0" />
    </button>

    {/* DROPDOWN */}
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
