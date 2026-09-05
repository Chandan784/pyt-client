export default function CustomerHeader({
  onCreate,
}) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          Customers
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Manage your customers and their booking
          information.
        </p>
      </div>

      <button
        onClick={onCreate}
        className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
      >
        <span className="text-lg">+</span>
        Add Customer
      </button>
    </div>
  );
}