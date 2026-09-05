import CustomerRow from "./CustomerRow";

export default function CustomerTable({
  customers,
  loading,
  actionLoading,
  onView,
  onEdit,
  onDelete,
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-[1100px] w-full">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50">
              <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Customer
              </th>

              <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Contact
              </th>

              <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Address
              </th>

              <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Bookings
              </th>

              <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Paid
              </th>

              <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Last Booking
              </th>

              <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Status
              </th>

              <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {loading
              ? Array.from({ length: 6 }).map(
                  (_, index) => (
                    <tr
                      key={index}
                      className="border-b border-slate-100"
                    >
                      {Array.from({
                        length: 8,
                      }).map(
                        (_, cellIndex) => (
                          <td
                            key={cellIndex}
                            className="px-5 py-5"
                          >
                            <div className="h-4 animate-pulse rounded bg-slate-100" />
                          </td>
                        )
                      )}
                    </tr>
                  )
                )
              : customers.map((customer) => (
                  <CustomerRow
                    key={customer.id}
                    customer={customer}
                    actionLoading={
                      actionLoading
                    }
                    onView={onView}
                    onEdit={onEdit}
                    onDelete={onDelete}
                  />
                ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}