export default function CustomerFilters({
  search,
  onSearch,
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="relative max-w-md">
        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
          🔍
        </span>

        <input
          type="text"
          value={search}
          onChange={(e) =>
            onSearch(e.target.value)
          }
          placeholder="Search by name, ID, email or phone..."
          className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-slate-400 focus:bg-white"
        />
      </div>
    </div>
  );
}