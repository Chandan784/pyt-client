"use client";

import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const bookingsData = [
  { month: "Jan", bookings: 120, revenue: 5000 },

  { month: "Feb", bookings: 200, revenue: 8500 },

  { month: "Mar", bookings: 150, revenue: 6200 },

  { month: "Apr", bookings: 280, revenue: 11200 },

  { month: "May", bookings: 320, revenue: 12800 },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      {/* STATS */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <Card title="Total Bookings" value="1,245" />

        <Card title="Revenue" value="$45.2K" />

        <Card title="Packages" value="320" />

        <Card title="Users" value="890" />
      </div>

      {/* CHARTS */}

      <div className="grid lg:grid-cols-2 gap-6">
        {/* LINE */}

        <div className="bg-white rounded-[30px] p-6 border">
          <h2 className="text-2xl font-black mb-5">Booking Analytics</h2>

          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={bookingsData}>
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="month" />

              <YAxis />

              <Tooltip />

              <Line
                type="monotone"
                dataKey="bookings"
                stroke="#000"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* BAR */}

        <div className="bg-white rounded-[30px] p-6 border">
          <h2 className="text-2xl font-black mb-5">Revenue Analytics</h2>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={bookingsData}>
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="month" />

              <YAxis />

              <Tooltip />

              <Bar dataKey="revenue" fill="#000" radius={[10, 10, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* TABLE */}

      <div className="bg-white rounded-[30px] border p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-2xl font-black">Recent Bookings</h2>
        </div>

        <div className="overflow-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b text-left">
                <th className="py-4">Booking</th>
                <th>Customer</th>
                <th>Date</th>
                <th>Status</th>
                <th>Amount</th>
              </tr>
            </thead>

            <tbody>
              {[1, 2, 3, 4].map((item) => (
                <tr key={item} className="border-b hover:bg-gray-50">
                  <td className="py-4 font-semibold">#BOOK-{item}</td>

                  <td>John Doe</td>

                  <td>29 May 2026</td>

                  <td>
                    <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm">
                      Confirmed
                    </span>
                  </td>

                  <td className="font-bold">$450</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function Card({ title, value }) {
  return (
    <div className="bg-white rounded-[30px] border p-6">
      <p className="text-gray-500">{title}</p>

      <h2 className="text-4xl font-black mt-3">{value}</h2>
    </div>
  );
}
