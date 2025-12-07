import { useState, useCallback } from "react";
import { getSales } from "../services/api";

export const useSales = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    pageSize: 10,
    hasNextPage: false,
    hasPreviousPage: false,
  });

  const buildParams = (uiParams = {}) => {
    const p = {};

    // Search
    if (uiParams.search) p.search = uiParams.search;
    
    // Pagination
    if (uiParams.page) p.page = uiParams.page;
    if (uiParams.pageSize) p.pageSize = uiParams.pageSize;

    // Sorting - extract key and direction
    if (uiParams.sortBy) {
      const [key, direction] = uiParams.sortBy.split("-");
      p.sortBy = key;
      if (direction) p.sortOrder = direction; // asc or desc
    }

    const filters = uiParams.filters || {};

    // Multi-select filters - join with commas
    if (filters.customerRegion?.length) {
      p.region = filters.customerRegion.join(',');
    }
    if (filters.gender?.length) {
      p.gender = filters.gender.join(',');
    }
    if (filters.productCategory?.length) {
      p.category = filters.productCategory.join(',');
    }
    if (filters.tags?.length) {
      p.tags = filters.tags.join(',');
    }
    if (filters.paymentMethod?.length) {
      p.payment = filters.paymentMethod.join(',');
    }

    // Age range filter
    if (filters.ageRange) {
      if (filters.ageRange.min !== "" && filters.ageRange.min !== undefined && filters.ageRange.min !== null) {
        p.ageMin = Number(filters.ageRange.min);
      }
      if (filters.ageRange.max !== "" && filters.ageRange.max !== undefined && filters.ageRange.max !== null) {
        p.ageMax = Number(filters.ageRange.max);
      }
    }

    // Date range filter (format: YYYY-MM-DD)
    if (filters.dateRange) {
      if (filters.dateRange.start) {
        p.dateFrom = filters.dateRange.start;
      }
      if (filters.dateRange.end) {
        p.dateTo = filters.dateRange.end;
      }
    }

    // Remove undefined/null values
    Object.keys(p).forEach(key => {
      if (p[key] === undefined || p[key] === null || p[key] === '') {
        delete p[key];
      }
    });

    return p;
  };

  const loadData = useCallback(async (uiParams = {}) => {
    setLoading(true);
    setError(null);

    try {
      const params = buildParams(uiParams);
      
      // DEBUG: Log the parameters being sent
      console.log('🔍 API Request Params:', params);
      console.log('🔍 Original UI Params:', uiParams);
      
      const res = await getSales(params);
      
      // DEBUG: Log the response
      console.log('📦 API Response:', res);

      // Check if response has success flag (backend format)
      if (res.success) {
        setData(res.data || []);

        if (res.pagination) {
          setPagination({
            currentPage: res.pagination.currentPage || 1,
            totalPages: res.pagination.totalPages || 1,
            totalItems: res.pagination.totalItems || 0,
            pageSize: res.pagination.pageSize || 10,
            hasNextPage: res.pagination.hasNextPage || false,
            hasPreviousPage: res.pagination.hasPreviousPage || false,
          });
        }
        
        console.log('✅ Data loaded successfully:', res.data?.length, 'items');
      } 
      // Fallback for array response
      else if (Array.isArray(res)) {
        setData(res);
        setPagination((prev) => ({
          ...prev,
          currentPage: uiParams.page || prev.currentPage,
          totalItems: res.length,
        }));
      } 
      // Fallback for object with data property
      else if (res.data) {
        setData(res.data || []);

        if (res.pagination) {
          setPagination({
            currentPage: res.pagination.currentPage || uiParams.page || 1,
            totalPages: res.pagination.totalPages || 1,
            totalItems: res.pagination.totalItems || res.data.length,
            pageSize: res.pagination.pageSize || uiParams.pageSize || 10,
            hasNextPage: res.pagination.hasNextPage || false,
            hasPreviousPage: res.pagination.hasPreviousPage || false,
          });
        }
      }
    } catch (err) {
      const errorMsg = err.message || "Failed to fetch sales";
      setError(errorMsg);
      console.error('❌ useSales loadData error:', err);
      setData([]);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    data,
    loading,
    error,
    pagination,
    loadData,
  };
};

export default useSales;