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
  const hasValue = minValue || maxValue;

  return (
    <div className="relative">
      {/* BUTTON */}
      <button
        onClick={onToggleOpen}
        className="px-4 py-2 bg-[#F2F4F7] border border-[#D0D5DD] rounded-lg flex items-center gap-2 text-sm text-gray-700 font-medium hover:bg-[#EAECF0] transition-colors"
      >
        {title}

        {hasValue && (
          <span className="px-2 py-0.5 bg-blue-100 text-blue-800 text-xs rounded-full font-semibold">
            1
          </span>
        )}

        <ChevronDown className="w-4 h-4 text-gray-700" />
      </button>

      {/* DROPDOWN */}
      {isOpen && (
        <div className="absolute top-full mt-2 bg-white border border-[#D0D5DD] rounded-lg shadow-lg z-20 p-4 min-w-[230px]">
          <div className="flex gap-3">

            <input
              type="number"
              placeholder={minPlaceholder}
              value={minValue}
              onChange={(e) => onMinChange(e.target.value)}
              className="w-full px-3 py-2 border border-[#D0D5DD] rounded-lg text-sm text-gray-800 focus:ring-2 focus:ring-blue-600"
            />

            <input
              type="number"
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
