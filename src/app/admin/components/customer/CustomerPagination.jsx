export default function CustomerPagination({
  page,
  totalPages,
  onPageChange,
}) {
  if (totalPages <= 1) return null;

  const pages = [];

  const start = Math.max(1, page - 2);
  const end = Math.min(
    totalPages,
    page + 2
  );

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm text-slate-500">
        Page {page} of {totalPages}
      </p>

      <div className="flex items-center gap-2">
        <button
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
          className="rounded-lg border border-slate-200 px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-40"
        >
          Previous
        </button>

        {pages.map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() =>
              onPageChange(pageNumber)
            }
            className={`h-9 min-w-9 rounded-lg px-3 text-sm font-medium ${
              pageNumber === page
                ? "bg-slate-900 text-white"
                : "border border-slate-200 text-slate-700 hover:bg-slate-50"
            }`}
          >
            {pageNumber}
          </button>
        ))}

        <button
          disabled={page >= totalPages}
          onClick={() => onPageChange(page + 1)}
          className="rounded-lg border border-slate-200 px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </div>
  );
}