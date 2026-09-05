export default function PaymentStatusBadge({ status }) {
  const styles = {
    PAID: "bg-emerald-50 text-emerald-700 border-emerald-200",
    PENDING: "bg-amber-50 text-amber-700 border-amber-200",
    FAILED: "bg-red-50 text-red-700 border-red-200",
    REFUNDED: "bg-purple-50 text-purple-700 border-purple-200",
  };

  const labels = {
    PAID: "Paid",
    PENDING: "Pending",
    FAILED: "Failed",
    REFUNDED: "Refunded",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium ${
        styles[status] ||
        "bg-gray-50 text-gray-700 border-gray-200"
      }`}
    >
      <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-current" />

      {labels[status] || status}
    </span>
  );
}