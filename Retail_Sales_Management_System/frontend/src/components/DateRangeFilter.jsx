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
    <div className="relative">
      {/* FILTER BUTTON */}
      <button
        onClick={onToggleOpen}
        className="px-4 py-2 bg-[#F2F4F7] border border-[#D0D5DD] rounded-lg flex items-center gap-2 text-sm text-gray-700 font-medium hover:bg-[#EAECF0] transition-colors"
      >
        Date

        {hasValue && (
          <span className="px-2 py-0.5 bg-blue-100 text-blue-800 text-xs rounded-full font-semibold">
            1
          </span>
        )}

        <ChevronDown className="w-4 h-4 text-gray-700" />
      </button>

      {/* DROPDOWN PANEL */}
      {isOpen && (
        <div className="absolute top-full mt-2 bg-white border border-[#D0D5DD] rounded-lg shadow-lg z-20 p-4 min-w-[250px]">
          <div className="space-y-4">

            {/* FROM DATE */}
            <div>
              <label className="block text-sm text-gray-600 mb-1">From</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => onStartChange(e.target.value)}
                className="w-full px-3 py-2 border border-[#D0D5DD] rounded-lg text-sm text-gray-800 focus:ring-2 focus:ring-blue-600"
              />
            </div>

            {/* TO DATE */}
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
