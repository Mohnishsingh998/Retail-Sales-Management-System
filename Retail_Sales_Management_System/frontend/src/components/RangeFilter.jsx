// src/components/RangeFilter.jsx
import React from "react";
import { ChevronDown } from "lucide-react";

const RangeFilter = ({
  title,
  minValue,
  maxValue,
  onMinChange,
  onMaxChange,
  isOpen,
  onToggleOpen,
  minPlaceholder = "Min",
  maxPlaceholder = "Max",
}) => {
  const hasValue =
  (minValue !== "" && !isNaN(Number(minValue))) ||
  (maxValue !== "" && !isNaN(Number(maxValue)));


  return (
    <div className="relative dropdown-wrapper whitespace-nowrap">
      {/* BUTTON */}
      <button
        onClick={onToggleOpen}
        className="px-1  h-[26px] bg-[#F2F4F7] border border-[#D0D5DD] rounded-sm inline-flex items-center justify-between gap-2 text-xs text-gray-700 hover:bg-[#EAECF0] transition-colors whitespace-nowrap shrink-0 font-normal"
      >
        <span>{title}</span>

        <ChevronDown className="w-4 h-4 text-gray-700 shrink-0" />
      </button>

      {/* DROPDOWN */}
      {isOpen && (
        <div className="absolute top-full mt-2 bg-white border border-[#D0D5DD] rounded-lg shadow-lg z-20 p-4 min-w-[230px]">
          <div className="flex gap-3">
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              placeholder={minPlaceholder}
              value={minValue}
              onChange={(e) => onMinChange(e.target.value)}
              className="w-full px-3 py-2 border border-[#D0D5DD] rounded-lg text-sm text-gray-800 focus:ring-2 focus:ring-blue-600"
            />

            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              placeholder={maxPlaceholder}
              value={maxValue}
              onChange={(e) => onMaxChange(e.target.value)}
              className="w-full px-3 py-2 border border-[#D0D5DD] rounded-lg text-sm text-gray-800 focus:ring-2 focus:ring-blue-600"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default RangeFilter;
