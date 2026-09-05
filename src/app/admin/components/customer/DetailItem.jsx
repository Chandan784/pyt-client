export default function DetailItem({
  label,
  value,
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
      <p className="text-xs font-medium text-slate-500">
        {label}
      </p>

      <div className="mt-2 break-words text-sm font-semibold text-slate-900">
        {value}
      </div>
    </div>
  );
}