import DetailItem from "./DetailItem";
import StatusBadge from "./StatusBadge";

function formatDate(date) {
  if (!date) return "—";

  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) {
    return "—";
  }

  return parsed.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function formatCurrency(value) {
  return `₹${Number(value || 0).toLocaleString(
    "en-IN"
  )}`;
}

export default function CustomerDetailsModal({
  customer,
  open,
  onClose,
}) {
  if (!open || !customer) return null;

  const stats = customer.stats || {};

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
          <div>
            <p className="text-xs font-medium text-slate-500">
              Customer
            </p>

            <h2 className="mt-1 text-xl font-bold text-slate-900">
              {customer.name}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-xl text-slate-500 hover:bg-slate-100"
          >
            ×
          </button>
        </div>

        <div className="space-y-6 p-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <DetailItem
              label="Customer ID"
              value={customer.customerId}
            />

            <DetailItem
              label="Status"
              value={
                <StatusBadge
                  status={stats.status}
                />
              }
            />

            <DetailItem
              label="Email"
              value={customer.email || "—"}
            />

            <DetailItem
              label="Phone"
              value={customer.phone}
            />

            <DetailItem
              label="Address"
              value={customer.address || "—"}
            />

            <DetailItem
              label="Customer Since"
              value={formatDate(
                customer.createdAt
              )}
            />
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold text-slate-900">
              Booking & Payment
            </h3>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <DetailItem
                label="Total Bookings"
                value={stats.totalBookings || 0}
              />

              <DetailItem
                label="Total Paid"
                value={formatCurrency(
                  stats.totalPaid
                )}
              />

              <DetailItem
                label="Last Booking"
                value={formatDate(
                  stats.lastBooking
                )}
              />

              <DetailItem
                label="Payment Status"
                value={
                  stats.paymentStatus || "Pending"
                }
              />
            </div>
          </div>
        </div>

        <div className="border-t border-slate-200 px-6 py-4 text-right">
          <button
            onClick={onClose}
            className="rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-800"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}