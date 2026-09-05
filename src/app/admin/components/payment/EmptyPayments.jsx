import { Receipt } from "lucide-react";

export default function EmptyPayments({
  hasFilters,
  onClear,
}) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white py-16 text-center">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
        <Receipt
          size={22}
          className="text-gray-500"
        />
      </div>

      <h3 className="mt-4 text-sm font-semibold text-gray-900">
        {hasFilters
          ? "No payments found"
          : "No payments yet"}
      </h3>

      <p className="mx-auto mt-1 max-w-sm text-sm text-gray-500">
        {hasFilters
          ? "Try changing your search or filters."
          : "Payments recorded for your bookings will appear here."}
      </p>

      {hasFilters && (
        <button
          onClick={onClear}
          className="mt-5 text-sm font-medium text-gray-900 underline"
        >
          Clear filters
        </button>
      )}
    </div>
  );
}