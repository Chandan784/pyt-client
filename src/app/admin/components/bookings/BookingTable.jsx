
"use client";

function StatusBadge({ status }) {
  const styles = {
    PENDING:
      "bg-yellow-100 text-yellow-700",

    CONFIRMED:
      "bg-green-100 text-green-700",

    COMPLETED:
      "bg-blue-100 text-blue-700",

    CANCELLED:
      "bg-red-100 text-red-700",
  };

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-medium ${
        styles[status] ||
        "bg-gray-100 text-gray-700"
      }`}
    >
      {status || "PENDING"}
    </span>
  );
}

function PaymentBadge({ status }) {
  const styles = {
    UNPAID:
      "bg-red-100 text-red-700",

    PARTIAL:
      "bg-yellow-100 text-yellow-700",

    PAID:
      "bg-green-100 text-green-700",

    REFUNDED:
      "bg-purple-100 text-purple-700",
  };

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-medium ${
        styles[status] ||
        "bg-gray-100 text-gray-700"
      }`}
    >
      {status || "UNPAID"}
    </span>
  );
}

export default function BookingTable({
  bookings,
  loading,
  onView,
  onEdit,
  onDelete,
}) {
  // ==================================================
  // LOADING
  // ==================================================

  if (loading) {
    return (
      <div className="rounded-xl border border-gray-200 bg-white p-10 text-center text-sm text-gray-500">
        Loading bookings...
      </div>
    );
  }

  // ==================================================
  // EMPTY
  // ==================================================

  if (!bookings.length) {
    return (
      <div className="rounded-xl border border-gray-200 bg-white p-10 text-center">
        <h3 className="font-medium text-gray-900">
          No bookings found
        </h3>

        <p className="mt-1 text-sm text-gray-500">
          Create your first booking to
          get started.
        </p>
      </div>
    );
  }

  // ==================================================
  // TABLE
  // ==================================================

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
      <div className="overflow-x-auto">

        <table className="w-full min-w-[1200px] text-left">

          {/* ==================================================
              HEADER
          ================================================== */}

          <thead className="border-b border-gray-200 bg-gray-50">

            <tr>

              <th className="px-5 py-4 text-xs font-semibold uppercase text-gray-500">
                Booking
              </th>

              <th className="px-5 py-4 text-xs font-semibold uppercase text-gray-500">
                Customer
              </th>

              <th className="px-5 py-4 text-xs font-semibold uppercase text-gray-500">
                Package
              </th>

              <th className="px-5 py-4 text-xs font-semibold uppercase text-gray-500">
                Travel Date
              </th>

              <th className="px-5 py-4 text-xs font-semibold uppercase text-gray-500">
                Travelers
              </th>

              <th className="px-5 py-4 text-xs font-semibold uppercase text-gray-500">
                Amount
              </th>

              <th className="px-5 py-4 text-xs font-semibold uppercase text-gray-500">
                Payment
              </th>

              <th className="px-5 py-4 text-xs font-semibold uppercase text-gray-500">
                Status
              </th>

              <th className="px-5 py-4 text-xs font-semibold uppercase text-gray-500">
                Action
              </th>

            </tr>

          </thead>

          {/* ==================================================
              BODY
          ================================================== */}

          <tbody className="divide-y divide-gray-100">

            {bookings.map((booking) => (

              <tr
                key={booking.id}
                className="hover:bg-gray-50"
              >

                {/* ==================================================
                    BOOKING
                ================================================== */}

                <td className="px-5 py-4">

                  <p className="font-medium text-gray-900">
                    {booking.booking_id ||
                      booking.bookingId ||
                      `#${booking.id}`}
                  </p>

                  <p className="mt-1 text-xs text-gray-500">
                    {booking.booking_source ||
                      booking.bookingSource ||
                      "-"}
                  </p>

                </td>

                {/* ==================================================
                    CUSTOMER
                ================================================== */}

                <td className="px-5 py-4">

                  <p className="font-medium text-gray-900">
                    {booking.customer_name ||
                      booking.customerName ||
                      booking.customer?.name ||
                      "-"}
                  </p>

                </td>

                {/* ==================================================
                    PACKAGE
                ================================================== */}

                <td className="px-5 py-4">

                  <p className="max-w-[220px] truncate text-sm text-gray-700">
                    {booking.package_name ||
                      booking.packageName ||
                      booking.package?.name ||
                      booking.package?.title ||
                      "-"}
                  </p>

                  <p className="mt-1 max-w-[220px] truncate text-xs text-gray-500">
                    {booking.destination_name ||
                      booking.destinationName ||
                      booking.destination?.name ||
                      booking.destination?.country ||
                      "-"}
                  </p>

                </td>

                {/* ==================================================
                    TRAVEL DATE
                ================================================== */}

                <td className="px-5 py-4 text-sm text-gray-700">

                  <div>
                    {booking.travel_start_date ||
                      booking.travelStartDate ||
                      "-"}
                  </div>

                  {(booking.travel_end_date ||
                    booking.travelEndDate) && (
                    <div className="mt-1 text-xs text-gray-500">
                      to{" "}
                      {booking.travel_end_date ||
                        booking.travelEndDate}
                    </div>
                  )}

                </td>

                {/* ==================================================
                    TRAVELERS
                ================================================== */}

                <td className="px-5 py-4 text-sm text-gray-700">
                  {booking.traveler_count ??
                    booking.travelerCount ??
                    0}
                </td>

                {/* ==================================================
                    AMOUNT
                ================================================== */}

                <td className="px-5 py-4">

                  <p className="font-medium text-gray-900">
                    ₹
                    {Number(
                      booking.total_amount ??
                        booking.totalAmount ??
                        0
                    ).toLocaleString("en-IN")}
                  </p>

                  <p className="mt-1 text-xs text-gray-500">
                    Paid ₹
                    {Number(
                      booking.paid_amount ??
                        booking.paidAmount ??
                        0
                    ).toLocaleString("en-IN")}
                  </p>

                </td>

                {/* ==================================================
                    PAYMENT
                ================================================== */}

                <td className="px-5 py-4">

                  <PaymentBadge
                    status={
                      booking.payment_status ||
                      booking.paymentStatus
                    }
                  />

                  <p className="mt-1 text-xs text-gray-500">
                    Due ₹
                    {Number(
                      booking.due_amount ??
                        booking.dueAmount ??
                        0
                    ).toLocaleString("en-IN")}
                  </p>

                </td>

                {/* ==================================================
                    STATUS
                ================================================== */}

                <td className="px-5 py-4">

                  <StatusBadge
                    status={booking.status}
                  />

                </td>

                {/* ==================================================
                    ACTIONS
                ================================================== */}

                <td className="px-5 py-4">

                  <div className="flex items-center gap-2">

                    {/* VIEW */}

                    <button
                      type="button"
                      onClick={() =>
                        onView(booking)
                      }
                      className="rounded-lg border border-gray-300 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-100"
                    >
                      View
                    </button>

                    {/* EDIT */}

                    <button
                      type="button"
                      onClick={() =>
                        onEdit(booking)
                      }
                      className="rounded-lg border border-gray-300 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-100"
                    >
                      Edit
                    </button>

                    {/* DELETE */}

                    <button
                      type="button"
                      onClick={() =>
                        onDelete(booking.id)
                      }
                      className="rounded-lg border border-red-200 px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50"
                    >
                      Delete
                    </button>

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>
    </div>
  );
}

