"use client";

export default function BookingFilters({
  search,
  setSearch,
  status,
  setStatus,
  onCreate,
}) {
  return (
    <div className="flex flex-col gap-3 rounded-xl border border-gray-200 bg-white p-4 md:flex-row md:items-center md:justify-between">
      <div className="flex flex-1 flex-col gap-3 sm:flex-row">
        <input
          type="text"
          placeholder="Search booking, customer, package..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-black sm:max-w-md"
        />

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-black"
        >
          <option value="">All Status</option>
          <option value="PENDING">Pending</option>
          <option value="CONFIRMED">Confirmed</option>
          <option value="COMPLETED">Completed</option>
          <option value="CANCELLED">Cancelled</option>
        </select>
      </div>

      <button
        onClick={onCreate}
        className="rounded-lg bg-black px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-800"
      >
        + New Booking
      </button>
    </div>
  );
}