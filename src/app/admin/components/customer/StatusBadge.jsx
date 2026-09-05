export default function StatusBadge({
  status = "New",
}) {
  const styles = {
    Active:
      "bg-emerald-50 text-emerald-700 border-emerald-200",

    New:
      "bg-blue-50 text-blue-700 border-blue-200",

    Inactive:
      "bg-slate-100 text-slate-600 border-slate-200",

    Blocked:
      "bg-red-50 text-red-700 border-red-200",
  };

  return (
    <span
      className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${
        styles[status] ||
        "bg-slate-100 text-slate-600 border-slate-200"
      }`}
    >
      {status}
    </span>
  );
}