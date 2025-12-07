import React from 'react';
import { Info } from 'lucide-react';

const StatsCard = ({ title, value, subtitle }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <div className="flex items-center justify-between gap-1">
        <span className="text-sm text-gray-600">{title}</span>
        <Info className="w-4 h-4 text-gray-500" />
      </div>
      <div className="text-14px font-bold text-black">
        {value}
        {subtitle && (
          <span className="text-14px font-bold text-black ml-1">
            {subtitle}
          </span>
        )}
      </div>
    </div>
  );
};

export default StatsCard;