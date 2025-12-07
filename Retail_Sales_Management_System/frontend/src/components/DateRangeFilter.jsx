// src/components/DateRangeFilter.jsx
import React from "react";
import { ChevronDown } from "lucide-react";

const DateRangeFilter = ({
  startDate = "",
  endDate = "",
  onStartChange,
  onEndChange,
  isOpen,
  onToggleOpen,
}) => {
  const hasValue = startDate || endDate;

  return (
    <div className="relative dropdown-wrapper whitespace-nowrap">
      {/* BUTTON */}
      <button
        onClick={onToggleOpen}
        className="px-3 py-1.5 h-[36px] bg-[#F2F4F7] border border-[#D0D5DD] rounded-lg inline-flex items-center justify-between gap-2 text-sm text-gray-700 font-medium hover:bg-[#EAECF0] transition-colors whitespace-nowrap shrink-0"
      >
        <span>Date</span>

        {hasValue && (
          <span className="px-2 py-0.5 bg-blue-100 text-blue-800 text-xs rounded-full font-semibold shrink-0">
            1
          </span>
        )}

        <ChevronDown className="w-4 h-4 text-gray-700 shrink-0" />
      </button>

      {/* DROPDOWN */}
      {isOpen && (
        <div className="absolute top-full mt-2 bg-white border border-[#D0D5DD] rounded-lg shadow-lg z-20 p-4 min-w-[250px]">
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">From</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => onStartChange(e.target.value)}
                className="w-full px-3 py-2 border border-[#D0D5DD] rounded-lg text-sm text-gray-800 focus:ring-2 focus:ring-blue-600"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">To</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => onEndChange(e.target.value)}
                className="w-full px-3 py-2 border border-[#D0D5DD] rounded-lg text-sm text-gray-800 focus:ring-2 focus:ring-blue-600"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DateRangeFilter;
