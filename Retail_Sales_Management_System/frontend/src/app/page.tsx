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
import { SORT_OPTIONS, FILTER_OPTIONS } from "../utils/constants";

/**
 * Minimal local type so TS doesn't treat data items as `never`.
 * Keep it permissive — add more precise fields if you want.
 */
type SaleItem = {
  Quantity?: number;
  "Total Amount"?: number;
  "Final Amount"?: number;
  [key: string]: any;
};

export default function SalesManagementPage() {
  const { filters, toggleFilter, updateRangeFilter, resetFilters } = useFilters();
  // cast useSales to any and declare data as SaleItem[] to avoid touching the hook file
  const { data = [] as SaleItem[], loading, pagination, loadData } = (useSales() as any);

  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("date-desc");
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const fetch = useCallback(() => {
    loadData({
      search,
      page,
      pageSize,
      sortBy,
      filters,
    });
  }, [search, page, pageSize, sortBy, filters, loadData]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      // e.target can be null in some environments; guard and cast
      const target = e.target as HTMLElement | null;
      if (!target || !target.closest(".dropdown-wrapper")) {
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
    resetFilters();
    setPage(1);
  };

  const toggleDropdown = (name: string) =>
    setOpenDropdown((prev) => (prev === name ? null : name));

  const totalUnits = data.reduce(
    (s, it) => s + Number(it.Quantity || 0),
    0
  );

  const totalAmount = data.reduce(
    (s, it) => s + Number(it["Total Amount"] || 0),
    0
  );

  const totalDiscount = data.reduce(
    (sum , item) => sum + ((item["Total Amount"] || 0) - (item["Final Amount"] || 0)),
    0
  );

  return (
    <div className="min-h-screen bg-white">
      {/* HEADER */}
      <div className="bg-white border-b border-gray-200 px-8 py-2 flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">
          Sales Management System
        </h1>

        <div className="w-110">
          <SearchBar
            value={search}
            onChange={(v: string) => {
              setSearch(v);
              setPage(1);
            }}
          />
        </div>
      </div>

      {/* FILTER BAR */}
      <div>
        <div className="bg-white rounded-lg p-5 pt-2 shadow-sm flex items-center gap-3 flex-wrap md:flex-nowrap w-full">

          {/* RESET BUTTON */}
          <button
            onClick={handleReset}
            className="h-[36px] w-[36px] flex items-center justify-center bg-[#F2F4F7] border border-[#D0D5DD] rounded-lg hover:bg-[#EAECF0] transition-colors"
          >
            <RotateCcw className="w-5 h-5 text-gray-700" />
          </button>

          {/* ALL FILTERS */}
          <div className="flex items-center gap-3 flex-wrap">

            <div className="dropdown-wrapper relative">
              <FilterDropdown
                title="Customer Region"
                options={FILTER_OPTIONS.customerRegion}
                category="customerRegion"
                selectedValues={filters.customerRegion}
                onToggle={toggleFilter}
                isOpen={openDropdown === "customerRegion"}
                onToggleOpen={() => toggleDropdown("customerRegion")}
              />
            </div>

            <div className="dropdown-wrapper relative">
              <FilterDropdown
                title="Gender"
                options={FILTER_OPTIONS.gender}
                category="gender"
                selectedValues={filters.gender}
                onToggle={toggleFilter}
                isOpen={openDropdown === "gender"}
                onToggleOpen={() => toggleDropdown("gender")}
              />
            </div>

            <div className="dropdown-wrapper relative">
              <RangeFilter
                title="Age Range"
                minValue={filters.ageRange.min}
                maxValue={filters.ageRange.max}
                onMinChange={(v: number) => updateRangeFilter("ageRange", "min", v)}
                onMaxChange={(v: number) => updateRangeFilter("ageRange", "max", v)}
                isOpen={openDropdown === "age"}
                onToggleOpen={() => toggleDropdown("age")}
              />
            </div>

            <div className="dropdown-wrapper relative">
              <FilterDropdown
                title="Product Category"
                options={FILTER_OPTIONS.productCategory}
                category="productCategory"
                selectedValues={filters.productCategory}
                onToggle={toggleFilter}
                isOpen={openDropdown === "productCategory"}
                onToggleOpen={() => toggleDropdown("productCategory")}
              />
            </div>

            <div className="dropdown-wrapper relative">
              <FilterDropdown
                title="Tags"
                options={FILTER_OPTIONS.tags}
                category="tags"
                selectedValues={filters.tags}
                onToggle={toggleFilter}
                isOpen={openDropdown === "tags"}
                onToggleOpen={() => toggleDropdown("tags")}
              />
            </div>

            <div className="dropdown-wrapper relative">
              <FilterDropdown
                title="Payment Method"
                options={FILTER_OPTIONS.paymentMethod}
                category="paymentMethod"
                selectedValues={filters.paymentMethod}
                onToggle={toggleFilter}
                isOpen={openDropdown === "paymentMethod"}
                onToggleOpen={() => toggleDropdown("paymentMethod")}
              />
            </div>

            <div className="dropdown-wrapper relative">
              <DateRangeFilter
                startDate={filters.dateRange.start}
                endDate={filters.dateRange.end}
                onStartChange={(v: string) => updateRangeFilter("dateRange", "start", v)}
                onEndChange={(v: string) => updateRangeFilter("dateRange", "end", v)}
                isOpen={openDropdown === "date"}
                onToggleOpen={() => toggleDropdown("date")}
              />
            </div>

          </div>

          {/* SORT (RIGHT SIDE) */}
          <div className="ml-auto flex items-center gap-3 pr-3">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 h-[36px] bg-[#F2F4F7] border border-[#D0D5DD] rounded-lg text-sm text-gray-700 font-medium hover:bg-[#EAECF0] transition-colors cursor-pointer"
            >
              {SORT_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  Sort by: {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* STATS CARDS */}
        <div className="flex items-start gap-4 pl-6 pb-4 flex-wrap bg-white">
          <StatsCard title="Total units sold" value={totalUnits} />
          <StatsCard
            title="Total Amount"
            value={formatCurrency(totalAmount)}
            subtitle={`(${data.length} SRs)`}
          />
          <StatsCard
            title="Total Discount"
            value={formatCurrency(totalDiscount)}
            subtitle={`(${data.length} SRs)`}
          />
        </div>

        {/* TABLE */}
        <TransactionTable data={data} loading={loading} />

        {/* PAGINATION */}
        {!loading && data.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm">
            <Pagination
              currentPage={pagination.currentPage || page}
              totalPages={pagination.totalPages || 1}
              hasNextPage={pagination.hasNextPage}
              hasPreviousPage={pagination.hasPreviousPage}
              onPageChange={(p: number) => {
                handlePageChange(p);
                setPage(p);
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
