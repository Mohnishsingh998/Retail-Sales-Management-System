"use client";

import React, { useEffect, useState, useCallback } from "react";

import SearchBar from "../components/SearchBar";
import FilterDropdown from "../components/FilterDropdown";
import RangeFilter from "../components/RangeFilter";
import DateRangeFilter from "../components/DateRangeFilter";
import StatsCard from "../components/StatsCard";
import TransactionTable from "../components/TransactionTable";
import Pagination from "../components/Pagination";
import { RotateCcw } from "lucide-react";
import { useFilters } from "../hooks/useFilters";
import useSales from "../hooks/useSales.js";
import { formatCurrency } from "../utils/helpers";
import Sidebar from "../components/Sidebar";
import { SORT_OPTIONS, FILTER_OPTIONS } from "../utils/constants";

/** Type for each sale row */
type SaleItem = {
  Quantity?: number;
  "Total Amount"?: number;
  "Final Amount"?: number;
  [key: string]: unknown;
};

type FilterState = {
  customerRegion: string[];
  gender: string[];
  ageRange: { min: number | string; max: number | string };
  productCategory: string[];
  tags: string[];
  paymentMethod: string[];
  dateRange: { start: string; end: string };
};

type PaginationState = {
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
};

type SalesHookReturn = {
  data: SaleItem[];
  loading: boolean;
  pagination: PaginationState;
  loadData: (params: {
    search: string;
    page: number;
    pageSize: number;
    sortBy: string;
    filters: FilterState;
  }) => void;
};

type FilterHookReturn = {
  filters: FilterState;
  toggleFilter: (category: string, value: string) => void;
  updateRangeFilter: (
    category: string,
    key: string,
    value: number | string
  ) => void;
  resetFilters: () => void;
};

type SortOption = {
  value: string;
  label: string;
};

export default function SalesManagementPage() {
  const { filters, toggleFilter, updateRangeFilter, resetFilters } =
    useFilters() as unknown as FilterHookReturn;

  const {
    data = [] as SaleItem[],
    loading,
    pagination,
    loadData,
  } = useSales() as unknown as SalesHookReturn;

  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("date-desc");
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const fetch = useCallback(() => {
    if (loadData) {
      loadData({
        search,
        page,
        pageSize,
        sortBy,
        filters,
      });
    }
  }, [search, page, pageSize, sortBy, filters, loadData]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target?.closest(".dropdown-wrapper")) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, []);

  const handlePageChange = (newPage: number) => setPage(newPage);

  const handleReset = () => {
    setSearch("");
    setSortBy("date-desc");
    if (resetFilters) resetFilters();
    setPage(1);
  };

  const toggleDropdown = (name: string) =>
    setOpenDropdown((prev) => (prev === name ? null : name));

  const totalUnits = Array.isArray(data)
    ? data.reduce((s: number, it: SaleItem) => s + Number(it.Quantity || 0), 0)
    : 0;

  const totalAmount = Array.isArray(data)
    ? data.reduce(
        (s: number, it: SaleItem) => s + Number(it["Total Amount"] || 0),
        0
      )
    : 0;

  const totalDiscount = Array.isArray(data)
    ? data.reduce(
        (sum: number, item: SaleItem) =>
          sum + ((item["Total Amount"] || 0) - (item["Final Amount"] || 0)),
        0
      )
    : 0;

  // Safe array for rendering
  const safeData = Array.isArray(data) ? data : [];
  const safePagination = pagination || {
    currentPage: 1,
    totalPages: 1,
    hasNextPage: false,
    hasPreviousPage: false,
  };

  // Type-safe filter options
  const customerRegionOptions = (FILTER_OPTIONS?.customerRegion ||
    []) as string[];
  const genderOptions = (FILTER_OPTIONS?.gender || []) as string[];
  const productCategoryOptions = (FILTER_OPTIONS?.productCategory ||
    []) as string[];
  const tagsOptions = (FILTER_OPTIONS?.tags || []) as string[];
  const paymentMethodOptions = (FILTER_OPTIONS?.paymentMethod ||
    []) as string[];

  // Type-safe filter values
  const selectedCustomerRegion = (filters?.customerRegion || []) as string[];
  const selectedGender = (filters?.gender || []) as string[];
  const selectedProductCategory = (filters?.productCategory || []) as string[];
  const selectedTags = (filters?.tags || []) as string[];
  const selectedPaymentMethod = (filters?.paymentMethod || []) as string[];

  // ------------------------------

  return (
    <div className="flex h-screen bg-gray-50">
      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN CONTENT */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* HEADER */}
        <div className="bg-white border-b border-gray-100 px-8 py-2">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-regular text-gray-900">
              Sales Management System
            </h1>

            <div className="w-90">
              <SearchBar
                value={search}
                onChange={(v: string) => {
                  setSearch(v);
                  setPage(1);
                }}
              />
            </div>
          </div>
        </div>

        {/* FILTER BAR */}
        <div className="bg-white px-8 py-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            {/* RESET BUTTON - Fixed width */}
            <button
              onClick={handleReset}
              className="h-[25px] w-[25px] shrink-0 flex items-center justify-center bg-[#F2F4F7] border border-[#D0D5DD] rounded-sm hover:bg-[#EAECF0] transition-colors"
              aria-label="Reset filters"
            >
              <RotateCcw className="w-2.5 h-2.5 text-gray-700" />
            </button>

            {/* FILTERS CONTAINER - Equal width for all filters */}
            <div className="flex items-center gap-1 flex-1">
              <div className="dropdown-wrapper relative ">
                <FilterDropdown
                  title="Customer Region"
                  options={customerRegionOptions as never[]}
                  category="customerRegion"
                  selectedValues={selectedCustomerRegion as never[]}
                  onToggle={toggleFilter}
                  isOpen={openDropdown === "customerRegion"}
                  onToggleOpen={() => toggleDropdown("customerRegion")}
                />
              </div>

              <div className="dropdown-wrapper relative ">
                <FilterDropdown
                  title="Gender"
                  options={genderOptions as never[]}
                  category="gender"
                  selectedValues={selectedGender as never[]}
                  onToggle={toggleFilter}
                  isOpen={openDropdown === "gender"}
                  onToggleOpen={() => toggleDropdown("gender")}
                />
              </div>

              <div className="dropdown-wrapper relative ">
                <RangeFilter
                  title="Age Range"
                  minValue={filters?.ageRange?.min ?? ""}
                  maxValue={filters?.ageRange?.max ?? ""}
                  onMinChange={(v: number) =>
                    updateRangeFilter && updateRangeFilter("ageRange", "min", v)
                  }
                  onMaxChange={(v: number) =>
                    updateRangeFilter && updateRangeFilter("ageRange", "max", v)
                  }
                  isOpen={openDropdown === "age"}
                  onToggleOpen={() => toggleDropdown("age")}
                />
              </div>

              <div className="dropdown-wrapper relative ">
                <FilterDropdown
                  title="Product Category"
                  options={productCategoryOptions as never[]}
                  category="productCategory"
                  selectedValues={selectedProductCategory as never[]}
                  onToggle={toggleFilter}
                  isOpen={openDropdown === "productCategory"}
                  onToggleOpen={() => toggleDropdown("productCategory")}
                />
              </div>

              <div className="dropdown-wrapper relative ">
                <FilterDropdown
                  title="Tags"
                  options={tagsOptions as never[]}
                  category="tags"
                  selectedValues={selectedTags as never[]}
                  onToggle={toggleFilter}
                  isOpen={openDropdown === "tags"}
                  onToggleOpen={() => toggleDropdown("tags")}
                />
              </div>

              <div className="dropdown-wrapper relative">
                <FilterDropdown
                  title="Payment Method"
                  options={paymentMethodOptions as never[]}
                  category="paymentMethod"
                  selectedValues={selectedPaymentMethod as never[]}
                  onToggle={toggleFilter}
                  isOpen={openDropdown === "paymentMethod"}
                  onToggleOpen={() => toggleDropdown("paymentMethod")}
                />
              </div>

              <div className="dropdown-wrapper relative shrink-0">
                <DateRangeFilter
                  startDate={filters?.dateRange?.start || ""}
                  endDate={filters?.dateRange?.end || ""}
                  onStartChange={(v: string) =>
                    updateRangeFilter &&
                    updateRangeFilter("dateRange", "start", v)
                  }
                  onEndChange={(v: string) =>
                    updateRangeFilter &&
                    updateRangeFilter("dateRange", "end", v)
                  }
                  isOpen={openDropdown === "date"}
                  onToggleOpen={() => toggleDropdown("date")}
                />
              </div>
            </div>

            {/* SORT DROPDOWN - Fixed on right */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="shrink-0 px-3 h-[26px] bg-[#F2F4F7] border border-[#D0D5DD] rounded-sm text-xs text-gray-700 font-medium hover:bg-[#EAECF0] transition-colors cursor-pointer min-w-[180px]"
            >
              {Array.isArray(SORT_OPTIONS) &&
                (SORT_OPTIONS as SortOption[]).map((option: SortOption) => (
                  <option key={option.value} value={option.value}>
                    Sort by: {option.label}
                  </option>
                ))}
            </select>
          </div>
        </div>

        {/* STATS */}
        <div className="bg-white px-8 py-4 border-gray-200">
          <div className="flex items-center gap-6">
            <StatsCard title="Total units sold" value={totalUnits} subtitle="" />
            <StatsCard
              title="Total Amount"
              value={formatCurrency(totalAmount)}
              subtitle={`(${safeData.length} SRs)`}
            />
            <StatsCard
              title="Total Discount"
              value={formatCurrency(totalDiscount)}
              subtitle={`(${safeData.length} SRs)`}
            />
          </div>
        </div>

        {/* TABLE */}
        <div className="flex-1 overflow-auto bg-white">
          <TransactionTable
            data={safeData as never[]}
            loading={loading || false}
          />
        </div>

        {/* PAGINATION */}
        {!loading && safeData.length > 0 && (
          <div className="bg-white border-t border-gray-200 px-8 py-2">
            <Pagination
              currentPage={safePagination.currentPage || page}
              totalPages={safePagination.totalPages || 1}
              hasNextPage={safePagination.hasNextPage || false}
              hasPreviousPage={safePagination.hasPreviousPage || false}
              onPageChange={(p: number) => {
                handlePageChange(p);
                setPage(p);
              }}
            />
          </div>
        )}
      </main>
    </div>
  );
}
