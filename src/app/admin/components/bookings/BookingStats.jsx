"use client";

export default function BookingStats({ bookings = [] }) {
  const totalBookings = bookings.length;

  const confirmedBookings = bookings.filter(
    (booking) => booking.status === "CONFIRMED"
  ).length;

  const totalRevenue = bookings.reduce(
    (sum, booking) => sum + Number(booking.paid_amount || 0),
    0
  );

  const pendingAmount = bookings.reduce(
    (sum, booking) => sum + Number(booking.due_amount || 0),
    0
  );

  const stats = [
    {
      label: "Total Bookings",
      value: totalBookings,
    },
    {
      label: "Confirmed",
      value: confirmedBookings,
    },
    {
      label: "Collected",
      value: `₹${totalRevenue.toLocaleString("en-IN")}`,
    },
    {
      label: "Pending Amount",
      value: `₹${pendingAmount.toLocaleString("en-IN")}`,
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
        >
          <p className="text-sm text-gray-500">{stat.label}</p>

          <h3 className="mt-2 text-2xl font-semibold text-gray-900">
            {stat.value}
          </h3>
        </div>
      ))}
    </div>
  );
}