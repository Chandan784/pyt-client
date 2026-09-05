"use client";

import {
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";

export default function PaymentFilters({
  filters,
  setFilters,
}) {
  const updateFilter = (key, value) => {
    setFilters((previous) => ({
      ...previous,
      [key]: value,
    }));
  };

  const clearFilters = () => {
    setFilters({
      search: "",
      status: "",
      payment_method: "",
    });
  };

  const hasFilters =
    filters.search ||
    filters.status ||
    filters.payment_method;

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <div className="flex flex-col gap-3 lg:flex-row">
        {/* Search */}
        <div className="relative flex-1">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search customer, booking or transaction..."
            value={filters.search}
            onChange={(e) =>
              updateFilter("search", e.target.value)
            }
            className="h-10 w-full rounded-lg border border-gray-200 bg-white pl-10 pr-4 text-sm outline-none transition focus:border-gray-400"
          />
        </div>

        {/* Status */}
        <select
          value={filters.status}
          onChange={(e) =>
            updateFilter("status", e.target.value)
          }
          className="h-10 rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-gray-400"
        >
          <option value="">All Status</option>
          <option value="PAID">Paid</option>
          <option value="PENDING">Pending</option>
          <option value="FAILED">Failed</option>
          <option value="REFUNDED">Refunded</option>
        </select>

        {/* Method */}
        <select
          value={filters.payment_method}
          onChange={(e) =>
            updateFilter(
              "payment_method",
              e.target.value
            )
          }
          className="h-10 rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-gray-400"
        >
          <option value="">All Methods</option>
          <option value="UPI">UPI</option>
          <option value="CARD">Card</option>
          <option value="BANK_TRANSFER">
            Bank Transfer
          </option>
          <option value="CASH">Cash</option>
        </select>

        {hasFilters && (
          <button
            onClick={clearFilters}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-gray-200 px-4 text-sm text-gray-600 hover:bg-gray-50"
          >
            <X size={16} />
            Clear
          </button>
        )}

        <div className="hidden items-center gap-2 px-2 text-gray-400 lg:flex">
          <SlidersHorizontal size={17} />
        </div>
      </div>
    </div>
  );
}