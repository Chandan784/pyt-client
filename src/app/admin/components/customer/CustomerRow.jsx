import StatusBadge from "./StatusBadge";

function formatDate(date) {
  if (!date) return "—";

  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) {
    return "—";
  }

  return parsed.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function formatCurrency(value) {
  return `₹${Number(value || 0).toLocaleString(
    "en-IN"
  )}`;
}

function getInitials(name) {
  if (!name) return "CU";

  return name
    .split(" ")
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}

export default function CustomerRow({
  customer,
  actionLoading,
  onView,
  onEdit,
  onDelete,
}) {
  const stats = customer.stats || {};

  return (
    <tr className="border-b border-slate-100 transition hover:bg-slate-50">
      <td className="px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-900 text-xs font-bold text-white">
            {getInitials(customer.name)}
          </div>

          <div className="min-w-0">
            <p className="truncate font-semibold text-slate-900">
              {customer.name}
            </p>

            <p className="text-xs text-slate-500">
              {customer.customerId}
            </p>
          </div>
        </div>
      </td>

      <td className="px-5 py-4">
        <div className="space-y-1">
          <p className="text-sm text-slate-700">
            {customer.email || "—"}
          </p>

          <p className="text-xs text-slate-500">
            {customer.phone}
          </p>
        </div>
      </td>

      <td className="max-w-[220px] px-5 py-4">
        <p className="truncate text-sm text-slate-600">
          {customer.address || "—"}
        </p>
      </td>

      <td className="px-5 py-4">
        <span className="font-semibold text-slate-900">
          {stats.totalBookings || 0}
        </span>
      </td>

      <td className="px-5 py-4">
        <span className="font-semibold text-slate-900">
          {formatCurrency(stats.totalPaid)}
        </span>
      </td>

      <td className="px-5 py-4 text-sm text-slate-600">
        {formatDate(stats.lastBooking)}
      </td>

      <td className="px-5 py-4">
        <StatusBadge status={stats.status} />
      </td>

      <td className="px-5 py-4">
        <div className="flex justify-end gap-2">
          <button
            onClick={() => onView(customer)}
            className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100"
          >
            View
          </button>

          <button
            onClick={() => onEdit(customer)}
            disabled={actionLoading}
            className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100 disabled:opacity-50"
          >
            Edit
          </button>

          <button
            onClick={() => onDelete(customer)}
            disabled={actionLoading}
            className="rounded-lg border border-red-200 px-3 py-2 text-xs font-medium text-red-600 hover:bg-red-50 disabled:opacity-50"
          >
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
}