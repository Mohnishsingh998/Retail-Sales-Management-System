// src/components/SearchBar.jsx
import React from "react";
import { Search } from "lucide-react";

const SearchBar = ({ value, onChange }) => {
  return (
    <div className="relative w-110">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />

      <input
        type="text"
        placeholder="Name, Phone no."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full pl-10 pr-4 py-2 bg-[#F2F4F7] border border-[#D0D5DD] rounded-lg text-sm text-gray-700 focus:ring-2 focus:ring-blue-600 focus:bg-white transition-colors"
      />
    </div>
  );
};

export default SearchBar;
