"use client";

function Detail({ label, value }) {
  return (
    <div>
      <p className="text-xs text-gray-500">{label}</p>
      <p className="mt-1 text-sm font-medium text-gray-900">
        {value || "-"}
      </p>
    </div>
  );
}

export default function BookingDetailsModal({
  booking,
  onClose,
}) {
  if (!booking) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white">
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-5">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Booking Details
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              {booking.booking_id}
            </p>
          </div>

          <button
            onClick={onClose}
            className="text-2xl leading-none text-gray-400 hover:text-gray-700"
          >
            ×
          </button>
        </div>

        <div className="space-y-6 p-6">
          <section>
            <h3 className="mb-4 text-sm font-semibold text-gray-900">
              Customer
            </h3>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <Detail
                label="Customer"
                value={booking.customer_name}
              />

              <Detail
                label="Customer ID"
                value={booking.customer_id}
              />
            </div>
          </section>

          <section>
            <h3 className="mb-4 text-sm font-semibold text-gray-900">
              Trip
            </h3>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <Detail
                label="Package"
                value={booking.package_name}
              />

              <Detail
                label="Destination"
                value={booking.destination_name}
              />

              <Detail
                label="Start Date"
                value={booking.travel_start_date}
              />

              <Detail
                label="End Date"
                value={booking.travel_end_date}
              />

              <Detail
                label="Travelers"
                value={booking.traveler_count}
              />

              <Detail
                label="Booking Source"
                value={booking.booking_source}
              />
            </div>
          </section>

          <section>
            <h3 className="mb-4 text-sm font-semibold text-gray-900">
              Payment
            </h3>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
              <Detail
                label="Total Amount"
                value={`₹${Number(
                  booking.total_amount
                ).toLocaleString("en-IN")}`}
              />

              <Detail
                label="Paid Amount"
                value={`₹${Number(
                  booking.paid_amount
                ).toLocaleString("en-IN")}`}
              />

              <Detail
                label="Due Amount"
                value={`₹${Number(
                  booking.due_amount
                ).toLocaleString("en-IN")}`}
              />

              <Detail
                label="Payment Status"
                value={booking.payment_status}
              />

              <Detail
                label="Booking Status"
                value={booking.status}
              />
            </div>
          </section>
        </div>

        <div className="flex justify-end border-t border-gray-200 px-6 py-4">
          <button
            onClick={onClose}
            className="rounded-lg bg-black px-5 py-2.5 text-sm font-medium text-white"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}