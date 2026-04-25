"use client";

import { useState } from "react";
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

/* Data */
const bookingsData = [
  { month: "Jan", bookings: 120, revenue: 5000 },
  { month: "Feb", bookings: 200, revenue: 8500 },
  { month: "Mar", bookings: 150, revenue: 6200 },
  { month: "Apr", bookings: 280, revenue: 11200 },
  { month: "May", bookings: 320, revenue: 12800 },
];

const menuItems = [
  { name: "Dashboard", icon: "📊" },
  { name: "Bookings", icon: "📅" },
  { name: "Trips", icon: "✈️" },
  { name: "Users", icon: "👥" },
  { name: "Settings", icon: "⚙️" },
];

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* SIDEBAR - Part of layout, not floating */}
      <aside
        className={`
          bg-gradient-to-b from-gray-900 to-gray-800 text-white
          transition-all duration-300 ease-in-out
          flex-shrink-0 overflow-y-auto
          ${sidebarOpen ? "w-64" : "w-0 md:w-20"}
        `}
      >
        <div
          className={`p-5 border-b border-gray-700 ${!sidebarOpen && "md:px-2"}`}
        >
          {sidebarOpen ? (
            <div>
              <h2 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Admin Panel
              </h2>
              <p className="text-xs text-gray-400 mt-1">Manage your platform</p>
            </div>
          ) : (
            <div className="text-center">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mx-auto">
                <span className="text-white font-bold text-sm">AP</span>
              </div>
            </div>
          )}
        </div>

        <nav className="p-4 space-y-1.5 text-sm">
          {menuItems.map((item) => (
            <MenuItem
              key={item.name}
              name={item.name}
              icon={item.icon}
              collapsed={!sidebarOpen}
              active={item.name === "Dashboard"}
            />
          ))}
        </nav>

        {/* Sidebar Footer */}
        <div
          className={`p-4 border-t border-gray-700 text-xs text-gray-400 ${!sidebarOpen && "md:text-center"}`}
        >
          {sidebarOpen ? (
            <>
              <p>© 2024 Admin Panel</p>
              <p className="mt-1">Version 1.0.0</p>
            </>
          ) : (
            <div className="w-8 h-8 mx-auto">
              <span className="text-xs">v1.0</span>
            </div>
          )}
        </div>
      </aside>

      {/* MAIN CONTENT - Takes remaining space */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* NAVBAR */}
        <header className="bg-white border-b px-6 py-4 flex justify-between items-center sticky top-0 z-10 shadow-sm">
          <div className="flex items-center gap-3">
            <button
              onClick={toggleSidebar}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
            >
              {sidebarOpen ? "◀" : "▶"}
            </button>
            <h1 className="font-semibold text-lg text-gray-800">
              Admin Dashboard
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-600">Welcome back!</span>
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
              A
            </div>
          </div>
        </header>

        {/* CONTENT */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6">
            {/* STATS CARDS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <Card
                title="Total Bookings"
                value="1,245"
                trend={{ value: 12.5, isPositive: true }}
              />
              <Card
                title="Active Trips"
                value="320"
                trend={{ value: 5.2, isPositive: true }}
              />
              <Card
                title="Revenue"
                value="$45.2K"
                trend={{ value: 8.1, isPositive: true }}
              />
              <Card
                title="Active Users"
                value="890"
                trend={{ value: 2.3, isPositive: false }}
              />
            </div>

            {/* CHARTS SECTION */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Line Chart */}
              <div className="bg-white p-6 rounded-xl border shadow-sm hover:shadow-md transition-shadow">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h2 className="text-base font-semibold text-gray-800">
                      Bookings Trend
                    </h2>
                    <p className="text-xs text-gray-500 mt-1">
                      Monthly booking statistics
                    </p>
                  </div>
                  <div className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded">
                    +23% vs last month
                  </div>
                </div>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart
                    data={bookingsData}
                    margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "white",
                        borderRadius: "8px",
                        border: "1px solid #e2e8f0",
                        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                      }}
                    />
                    <Line
                      dataKey="bookings"
                      stroke="#2563eb"
                      strokeWidth={2}
                      dot={{ fill: "#2563eb", strokeWidth: 2 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Bar Chart */}
              <div className="bg-white p-6 rounded-xl border shadow-sm hover:shadow-md transition-shadow">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h2 className="text-base font-semibold text-gray-800">
                      Revenue Overview
                    </h2>
                    <p className="text-xs text-gray-500 mt-1">
                      Monthly revenue ($)
                    </p>
                  </div>
                </div>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart
                    data={bookingsData}
                    margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip
                      formatter={(value) => [`$${value}`, "Revenue"]}
                      contentStyle={{
                        backgroundColor: "white",
                        borderRadius: "8px",
                        border: "1px solid #e2e8f0",
                      }}
                    />
                    <Bar
                      dataKey="revenue"
                      fill="#10b981"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Recent Activity Table */}
            <div className="bg-white p-6 rounded-xl border shadow-sm">
              <h2 className="text-base font-semibold text-gray-800 mb-4">
                Recent Bookings
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="border-b">
                    <tr className="text-left text-gray-600">
                      <th className="pb-3">Booking ID</th>
                      <th className="pb-3">Customer</th>
                      <th className="pb-3">Date</th>
                      <th className="pb-3">Status</th>
                      <th className="pb-3">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      {
                        id: "#1234",
                        customer: "John Doe",
                        date: "2024-03-25",
                        status: "Confirmed",
                        amount: "$299",
                      },
                      {
                        id: "#1235",
                        customer: "Jane Smith",
                        date: "2024-03-24",
                        status: "Pending",
                        amount: "$450",
                      },
                      {
                        id: "#1236",
                        customer: "Bob Johnson",
                        date: "2024-03-24",
                        status: "Completed",
                        amount: "$180",
                      },
                      {
                        id: "#1237",
                        customer: "Sarah Wilson",
                        date: "2024-03-23",
                        status: "Confirmed",
                        amount: "$525",
                      },
                      {
                        id: "#1238",
                        customer: "Mike Brown",
                        date: "2024-03-23",
                        status: "Pending",
                        amount: "$310",
                      },
                    ].map((booking) => (
                      <tr
                        key={booking.id}
                        className="border-b hover:bg-gray-50"
                      >
                        <td className="py-3 font-medium">{booking.id}</td>
                        <td className="py-3">{booking.customer}</td>
                        <td className="py-3">{booking.date}</td>
                        <td className="py-3">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium
                            ${booking.status === "Confirmed" ? "bg-green-100 text-green-700" : ""}
                            ${booking.status === "Pending" ? "bg-yellow-100 text-yellow-700" : ""}
                            ${booking.status === "Completed" ? "bg-blue-100 text-blue-700" : ""}
                          `}
                          >
                            {booking.status}
                          </span>
                        </td>
                        <td className="py-3 font-medium">{booking.amount}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

/* Components */

function MenuItem({ name, icon, collapsed, active }) {
  return (
    <div
      className={`
        px-4 py-2.5 rounded-lg cursor-pointer transition-all duration-200
        flex items-center gap-3 group
        ${
          active
            ? "bg-blue-600 text-white shadow-md"
            : "text-gray-300 hover:bg-gray-700 hover:text-white"
        }
        ${collapsed && "md:justify-center md:px-2"}
      `}
      role="button"
      tabIndex={0}
    >
      <span className="text-lg">{icon}</span>
      {!collapsed && <span className="font-medium">{name}</span>}
      {collapsed && (
        <div className="absolute left-20 bg-gray-800 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
          {name}
        </div>
      )}
    </div>
  );
}

function Card({ title, value, trend }) {
  return (
    <div className="bg-white p-5 rounded-xl border shadow-sm hover:shadow-md transition-all duration-200">
      <p className="text-sm text-gray-500 mb-2">{title}</p>
      <div className="flex items-baseline justify-between">
        <h2 className="text-2xl font-bold text-gray-800">{value}</h2>
        {trend && (
          <div
            className={`flex items-center gap-1 text-sm font-medium
            ${trend.isPositive ? "text-green-600" : "text-red-600"}`}
          >
            <span>{trend.isPositive ? "↑" : "↓"}</span>
            <span>{Math.abs(trend.value)}%</span>
          </div>
        )}
      </div>
    </div>
  );
}
