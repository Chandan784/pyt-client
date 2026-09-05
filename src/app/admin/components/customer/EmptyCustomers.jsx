export default function EmptyCustomers({
  search,
  onCreate,
}) {
  return (
    <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-2xl">
        👥
      </div>

      <h3 className="mt-4 text-lg font-bold text-slate-900">
        {search
          ? "No customers found"
          : "No customers yet"}
      </h3>

      <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
        {search
          ? "Try changing your search."
          : "Create your first customer to get started."}
      </p>

      {!search && (
        <button
          onClick={onCreate}
          className="mt-5 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800"
        >
          Add Customer
        </button>
      )}
    </div>
  );
}