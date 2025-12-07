import { useState } from "react";
export const useFilters = () => {
  const [filters, setFilters] = useState({
    customerRegion: [],
    gender: [],
    ageRange: { min: "", max: "" },
    productCategory: [],
    tags: [],
    paymentMethod: [],
    dateRange: { start: "", end: "" },
  });

  const toggleFilter = (category, value) => {
    setFilters(prev => {
      const cur = prev[category];
      if (Array.isArray(cur)) {
        const next = cur.includes(value) ? cur.filter(v => v !== value) : [...cur, value];
        return { ...prev, [category]: next };
      }
      return prev;
    });
  };

  const updateRangeFilter = (category, key, value) => {
    setFilters(prev => ({
      ...prev,
      [category]: { ...prev[category], [key]: value },
    }));
  };

  const resetFilters = () => {
    setFilters({
      customerRegion: [],
      gender: [],
      ageRange: { min: "", max: "" },
      productCategory: [],
      tags: [],
      paymentMethod: [],
      dateRange: { start: "", end: "" },
    });
  };

  return { filters, toggleFilter, updateRangeFilter, resetFilters };
};

export default useFilters;
