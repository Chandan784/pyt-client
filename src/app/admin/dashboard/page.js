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
} from "recharts";

/* Data */
const bookingsData = [
  { month: "Jan", bookings: 120 },
  { month: "Feb", bookings: 200 },
  { month: "Mar", bookings: 150 },
  { month: "Apr", bookings: 280 },
  { month: "May", bookings: 320 },
];

const revenueData = [
  { month: "Jan", revenue: 4000 },
  { month: "Feb", revenue: 7000 },
  { month: "Mar", revenue: 5000 },
  { month: "Apr", revenue: 9000 },
  { month: "May", revenue: 11000 },
];

export default function Dashboard() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`fixed md:relative z-50 h-full w-64 
        bg-gradient-to-b from-indigo-900 to-indigo-700 text-white
        p-5 transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">✈ Travel Admin</h2>
          <button onClick={() => setOpen(false)} className="md:hidden">
            ✕
          </button>
        </div>

        {/* Menu */}
        <nav className="space-y-2">
          <MenuItem name="Dashboard" active />
          <MenuItem name="Bookings" />
          <MenuItem name="Trips" />
          <MenuItem name="Customers" />
          <MenuItem name="Reports" />
        </nav>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <header className="bg-white shadow-sm flex justify-between items-center px-4 py-3">
          <button onClick={() => setOpen(true)} className="md:hidden text-xl">
            ☰
          </button>

          <h1 className="font-semibold text-lg text-gray-700">
            Travel Dashboard
          </h1>

          <div className="flex items-center gap-2">
            <div className="bg-indigo-600 text-white px-3 py-1 rounded-full text-sm">
              Admin
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="p-4 overflow-y-auto">
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <Card title="Bookings" value="1,245" />
            <Card title="Trips" value="320" />
            <Card title="Revenue" value="$45K" />
            <Card title="Users" value="890" />
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {/* Line */}
            <div className="bg-white p-4 rounded-xl shadow-sm">
              <h2 className="font-semibold mb-2 text-gray-600">
                Booking Trends
              </h2>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={bookingsData}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line dataKey="bookings" stroke="#4f46e5" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Bar */}
            <div className="bg-white p-4 rounded-xl shadow-sm">
              <h2 className="font-semibold mb-2 text-gray-600">Revenue</h2>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={revenueData}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="revenue" fill="#22c55e" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Table */}
          <div className="bg-white p-4 rounded-xl shadow-sm">
            <h2 className="font-semibold mb-4 text-gray-600">
              Recent Bookings
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-100 text-gray-600">
                  <tr>
                    <th className="p-2">Name</th>
                    <th className="p-2">Destination</th>
                    <th className="p-2">Date</th>
                    <th className="p-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <Row
                    name="John Doe"
                    place="Paris"
                    date="12 Mar"
                    status="Confirmed"
                  />
                  <Row
                    name="Sara Ali"
                    place="Dubai"
                    date="15 Mar"
                    status="Pending"
                  />
                  <Row
                    name="Mike Ross"
                    place="London"
                    date="18 Mar"
                    status="Cancelled"
                  />
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

/* Components */

function MenuItem({ name, active }) {
  return (
    <div
      className={`p-2 rounded cursor-pointer transition
      ${active ? "bg-white text-indigo-700 font-semibold" : "hover:bg-indigo-600"}`}
    >
      {name}
    </div>
  );
}

function Card({ title, value }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border">
      <p className="text-gray-500 text-sm">{title}</p>
      <h2 className="text-xl font-bold text-gray-800">{value}</h2>
    </div>
  );
}

function Row({ name, place, date, status }) {
  return (
    <tr className="border-b">
      <td className="p-2">{name}</td>
      <td className="p-2">{place}</td>
      <td className="p-2">{date}</td>
      <td className="p-2">
        <span
          className={
            status === "Confirmed"
              ? "text-green-600"
              : status === "Pending"
                ? "text-yellow-600"
                : "text-red-600"
          }
        >
          {status}
        </span>
      </td>
    </tr>
  );
}
