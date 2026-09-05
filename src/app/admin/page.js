"use client";

import { useMemo, useState } from "react";

import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

/* =========================================================
   DEMO DATA
   Replace these later with your API data
========================================================= */

const monthlyData = [
  { month: "Jan", bookings: 120, revenue: 500000, enquiries: 340 },
  { month: "Feb", bookings: 180, revenue: 720000, enquiries: 410 },
  { month: "Mar", bookings: 165, revenue: 680000, enquiries: 390 },
  { month: "Apr", bookings: 240, revenue: 940000, enquiries: 520 },
  { month: "May", bookings: 310, revenue: 1250000, enquiries: 640 },
  { month: "Jun", bookings: 365, revenue: 1480000, enquiries: 710 },
];

const bookingStatusData = [
  { name: "Confirmed", value: 365 },
  { name: "Pending", value: 82 },
  { name: "Completed", value: 198 },
  { name: "Cancelled", value: 34 },
];

const destinationData = [
  { name: "Dubai", bookings: 82, revenue: 420000 },
  { name: "Goa", bookings: 71, revenue: 265000 },
  { name: "Bali", bookings: 63, revenue: 380000 },
  { name: "Thailand", bookings: 52, revenue: 310000 },
  { name: "Kashmir", bookings: 47, revenue: 215000 },
];

const recentBookings = [
  {
    id: "TRV-10452",
    customer: "Rahul Sharma",
    destination: "Dubai",
    date: "12 Jun 2026",
    amount: 85000,
    payment: "Paid",
    status: "Confirmed",
  },
  {
    id: "TRV-10451",
    customer: "Priya Das",
    destination: "Bali",
    date: "15 Jun 2026",
    amount: 72000,
    payment: "Partial",
    status: "Confirmed",
  },
  {
    id: "TRV-10450",
    customer: "Amit Kumar",
    destination: "Goa",
    date: "18 Jun 2026",
    amount: 32000,
    payment: "Pending",
    status: "Pending",
  },
  {
    id: "TRV-10449",
    customer: "Sneha Patel",
    destination: "Thailand",
    date: "22 Jun 2026",
    amount: 95000,
    payment: "Paid",
    status: "Confirmed",
  },
  {
    id: "TRV-10448",
    customer: "Arjun Mehta",
    destination: "Kashmir",
    date: "28 Jun 2026",
    amount: 54000,
    payment: "Partial",
    status: "Pending",
  },
];

const upcomingTrips = [
  {
    customer: "Rahul Sharma",
    destination: "Dubai",
    date: "12 Jun 2026",
    days: 3,
    status: "Confirmed",
  },
  {
    customer: "Priya Das",
    destination: "Bali",
    date: "15 Jun 2026",
    days: 7,
    status: "Confirmed",
  },
  {
    customer: "Amit Kumar",
    destination: "Goa",
    date: "18 Jun 2026",
    days: 10,
    status: "Pending",
  },
  {
    customer: "Sneha Patel",
    destination: "Thailand",
    date: "22 Jun 2026",
    days: 14,
    status: "Confirmed",
  },
];

const crmTasks = [
  {
    title: "Follow up with Rahul Sharma",
    type: "Lead Follow-up",
    priority: "High",
    time: "10:30 AM",
  },
  {
    title: "Collect pending payment from Priya Das",
    type: "Payment",
    priority: "High",
    time: "11:00 AM",
  },
  {
    title: "Send Dubai quotation",
    type: "Quotation",
    priority: "Medium",
    time: "12:30 PM",
  },
  {
    title: "Confirm hotel for Amit Kumar",
    type: "Operations",
    priority: "Medium",
    time: "02:00 PM",
  },
];

const leadFunnel = [
  { name: "Enquiries", value: 710 },
  { name: "Qualified", value: 520 },
  { name: "Quotations", value: 310 },
  { name: "Bookings", value: 156 },
];

const COLORS = ["#111827", "#64748b", "#94a3b8", "#cbd5e1"];

/* =========================================================
   HELPERS
========================================================= */

function currency(value) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

function number(value) {
  return new Intl.NumberFormat("en-IN").format(value);
}

/* =========================================================
   MAIN DASHBOARD
========================================================= */

export default function AdminDashboard() {
  const [range, setRange] = useState("This Month");

  const totalBookings = 847;
  const confirmedBookings = 365;
  const customers = 1284;
  const enquiries = 710;

  const totalRevenue = 1480000;
  const collected = 1085000;
  const outstanding = totalRevenue - collected;

  const conversionRate = ((156 / 710) * 100).toFixed(1);

  const averageBookingValue = totalRevenue / totalBookings;

  const paymentCollectionPercentage =
    (collected / totalRevenue) * 100;

  const todayOperations = useMemo(
    () => ({
      departures: 8,
      arrivals: 5,
      pendingConfirmation: 12,
      paymentDue: 17,
      quotations: 9,
    }),
    []
  );

  return (
    <div className="min-h-screen bg-[#f7f8fa] p-4 md:p-6 lg:p-8">
      <div className="mx-auto max-w-[1800px] space-y-6">

        {/* =================================================
            HEADER
        ================================================= */}

        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

          <div>
            <p className="text-sm font-medium text-slate-500">
              Thursday, June 11, 2026
            </p>

            <h1 className="mt-1 text-3xl font-black tracking-tight text-slate-950">
              Good morning, Admin 👋
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Here's what's happening with your travel business today.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">

            <select
              value={range}
              onChange={(e) => setRange(e.target.value)}
              className="h-11 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold outline-none"
            >
              <option>Today</option>
              <option>This Week</option>
              <option>This Month</option>
              <option>This Quarter</option>
              <option>This Year</option>
            </select>

            <button className="h-11 rounded-xl bg-slate-950 px-5 text-sm font-bold text-white transition hover:bg-slate-800">
              + New Booking
            </button>

          </div>
        </div>

        {/* =================================================
            PRIMARY KPI
        ================================================= */}

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

          <StatCard
            title="Total Bookings"
            value={number(totalBookings)}
            change="+18.6%"
            description="vs last month"
            icon="▣"
          />

          <StatCard
            title="Total Revenue"
            value={currency(totalRevenue)}
            change="+24.8%"
            description="vs last month"
            icon="₹"
          />

          <StatCard
            title="Customers"
            value={number(customers)}
            change="+12.4%"
            description="new customers"
            icon="♙"
          />

          <StatCard
            title="Conversion Rate"
            value={`${conversionRate}%`}
            change="+4.2%"
            description="lead to booking"
            icon="%"
          />

        </div>

        {/* =================================================
            SECONDARY BUSINESS METRICS
        ================================================= */}

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-6">

          <MiniStat
            title="Confirmed"
            value={confirmedBookings}
          />

          <MiniStat
            title="Pending"
            value={82}
          />

          <MiniStat
            title="Upcoming Trips"
            value={43}
          />

          <MiniStat
            title="Enquiries"
            value={enquiries}
          />

          <MiniStat
            title="Quotations"
            value={310}
          />

          <MiniStat
            title="Avg. Booking"
            value={currency(averageBookingValue)}
          />

        </div>

        {/* =================================================
            ATTENTION CENTER
        ================================================= */}

        <section>

          <SectionHeading
            title="Attention Required"
            description="Items that need your team's action"
          />

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">

            <AttentionCard
              title="Pending Payments"
              value="₹3.95L"
              count="27 bookings"
              icon="₹"
            />

            <AttentionCard
              title="Pending Bookings"
              value="82"
              count="Need confirmation"
              icon="!"
            />

            <AttentionCard
              title="Follow-ups Due"
              value="18"
              count="7 high priority"
              icon="↻"
            />

            <AttentionCard
              title="Quotations Pending"
              value="9"
              count="Awaiting customer"
              icon="▤"
            />

          </div>

        </section>

        {/* =================================================
            REVENUE ANALYTICS
        ================================================= */}

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">

          {/* Revenue */}
          <div className="rounded-[28px] border border-slate-200 bg-white p-6 xl:col-span-2">

            <div className="mb-6 flex items-center justify-between">

              <div>
                <h2 className="text-xl font-black text-slate-950">
                  Revenue Overview
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Revenue and booking performance
                </p>
              </div>

              <button className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-bold">
                View Report
              </button>

            </div>

            <div className="h-[320px]">

              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyData}>

                  <defs>
                    <linearGradient
                      id="revenueGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="5%"
                        stopOpacity={0.2}
                      />

                      <stop
                        offset="95%"
                        stopOpacity={0}
                      />
                    </linearGradient>
                  </defs>

                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="#e5e7eb"
                  />

                  <XAxis
                    dataKey="month"
                    axisLine={false}
                    tickLine={false}
                  />

                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(value) =>
                      `₹${value / 100000}L`
                    }
                  />

                  <Tooltip
                    formatter={(value) => currency(value)}
                  />

                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="#111827"
                    strokeWidth={3}
                    fill="url(#revenueGradient)"
                  />

                </AreaChart>
              </ResponsiveContainer>

            </div>
          </div>

          {/* Booking Status */}
          <div className="rounded-[28px] border border-slate-200 bg-white p-6">

            <div className="mb-4">
              <h2 className="text-xl font-black">
                Booking Status
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Current booking distribution
              </p>
            </div>

            <div className="h-[230px]">

              <ResponsiveContainer width="100%" height="100%">
                <PieChart>

                  <Pie
                    data={bookingStatusData}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={65}
                    outerRadius={95}
                    paddingAngle={3}
                  >
                    {bookingStatusData.map((_, index) => (
                      <Cell
                        key={index}
                        fill={COLORS[index]}
                      />
                    ))}
                  </Pie>

                  <Tooltip />

                </PieChart>
              </ResponsiveContainer>

            </div>

            <div className="space-y-3">

              {bookingStatusData.map((item, index) => (
                <div
                  key={item.name}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">

                    <span
                      className="h-2.5 w-2.5 rounded-full"
                      style={{
                        backgroundColor: COLORS[index],
                      }}
                    />

                    <span className="text-sm text-slate-600">
                      {item.name}
                    </span>

                  </div>

                  <span className="text-sm font-bold">
                    {item.value}
                  </span>
                </div>
              ))}

            </div>

          </div>

        </div>

        {/* =================================================
            CRM + OPERATIONS
        ================================================= */}

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">

          {/* CRM Funnel */}

          <div className="rounded-[28px] border border-slate-200 bg-white p-6">

            <SectionHeading
              title="Sales Funnel"
              description="Lead to booking journey"
            />

            <div className="mt-6 space-y-4">

              {leadFunnel.map((item, index) => {

                const percentage =
                  (item.value / leadFunnel[0].value) * 100;

                return (
                  <div key={item.name}>

                    <div className="mb-2 flex justify-between">

                      <span className="text-sm font-semibold">
                        {item.name}
                      </span>

                      <span className="text-sm font-bold">
                        {number(item.value)}
                      </span>

                    </div>

                    <div className="h-3 overflow-hidden rounded-full bg-slate-100">

                      <div
                        className="h-full rounded-full bg-slate-900"
                        style={{
                          width: `${percentage}%`,
                        }}
                      />

                    </div>

                  </div>
                );
              })}

            </div>

            <div className="mt-6 rounded-xl bg-slate-50 p-4">

              <p className="text-xs text-slate-500">
                Overall conversion
              </p>

              <p className="mt-1 text-2xl font-black">
                {conversionRate}%
              </p>

            </div>

          </div>

          {/* Today's Operations */}

          <div className="rounded-[28px] border border-slate-200 bg-white p-6">

            <SectionHeading
              title="Today's Operations"
              description="Operational workload"
            />

            <div className="mt-5 grid grid-cols-2 gap-3">

              <OperationCard
                title="Departures"
                value={todayOperations.departures}
              />

              <OperationCard
                title="Arrivals"
                value={todayOperations.arrivals}
              />

              <OperationCard
                title="Confirmation"
                value={todayOperations.pendingConfirmation}
              />

              <OperationCard
                title="Payments Due"
                value={todayOperations.paymentDue}
              />

              <OperationCard
                title="Quotations"
                value={todayOperations.quotations}
              />

              <OperationCard
                title="Trips"
                value={43}
              />

            </div>

          </div>

          {/* CRM Tasks */}

          <div className="rounded-[28px] border border-slate-200 bg-white p-6">

            <SectionHeading
              title="My Tasks"
              description="Priority actions for today"
            />

            <div className="mt-5 space-y-3">

              {crmTasks.map((task) => (
                <div
                  key={task.title}
                  className="rounded-xl border border-slate-100 p-4 transition hover:bg-slate-50"
                >

                  <div className="flex items-start justify-between gap-3">

                    <div>

                      <p className="text-sm font-bold">
                        {task.title}
                      </p>

                      <p className="mt-1 text-xs text-slate-500">
                        {task.type} • {task.time}
                      </p>

                    </div>

                    <PriorityBadge
                      priority={task.priority}
                    />

                  </div>

                </div>
              ))}

            </div>

          </div>

        </div>

        {/* =================================================
            PAYMENTS
        ================================================= */}

        <div className="rounded-[28px] border border-slate-200 bg-white p-6">

          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

            <SectionHeading
              title="Payment Overview"
              description="Financial collection status"
            />

            <button className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-bold">
              View Payments
            </button>

          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">

            <FinanceCard
              title="Total Sales"
              value={currency(totalRevenue)}
            />

            <FinanceCard
              title="Collected"
              value={currency(collected)}
            />

            <FinanceCard
              title="Outstanding"
              value={currency(outstanding)}
            />

          </div>

          <div className="mt-6">

            <div className="mb-2 flex justify-between">

              <span className="text-sm font-semibold">
                Collection Progress
              </span>

              <span className="text-sm font-bold">
                {paymentCollectionPercentage.toFixed(0)}%
              </span>

            </div>

            <div className="h-3 overflow-hidden rounded-full bg-slate-100">

              <div
                className="h-full rounded-full bg-slate-950"
                style={{
                  width: `${paymentCollectionPercentage}%`,
                }}
              />

            </div>

          </div>

        </div>

        {/* =================================================
            BOOKINGS + UPCOMING TRIPS
        ================================================= */}

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">

          {/* Recent Bookings */}

          <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white xl:col-span-2">

            <div className="flex items-center justify-between border-b border-slate-100 p-6">

              <div>
                <h2 className="text-xl font-black">
                  Recent Bookings
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Latest customer bookings
                </p>
              </div>

              <button className="text-sm font-bold text-slate-900">
                View All →
              </button>

            </div>

            <div className="overflow-x-auto">

              <table className="w-full min-w-[800px]">

                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50 text-left">

                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                      Booking
                    </th>

                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                      Customer
                    </th>

                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                      Destination
                    </th>

                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                      Travel Date
                    </th>

                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                      Payment
                    </th>

                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                      Status
                    </th>

                    <th className="px-6 py-4 text-right text-xs font-bold uppercase tracking-wider text-slate-500">
                      Amount
                    </th>

                  </tr>
                </thead>

                <tbody>

                  {recentBookings.map((booking) => (

                    <tr
                      key={booking.id}
                      className="border-b border-slate-100 transition hover:bg-slate-50"
                    >

                      <td className="px-6 py-5">

                        <span className="font-bold">
                          #{booking.id}
                        </span>

                      </td>

                      <td className="px-6 py-5">

                        <span className="font-semibold">
                          {booking.customer}
                        </span>

                      </td>

                      <td className="px-6 py-5 text-sm text-slate-600">
                        {booking.destination}
                      </td>

                      <td className="px-6 py-5 text-sm text-slate-600">
                        {booking.date}
                      </td>

                      <td className="px-6 py-5">
                        <PaymentBadge
                          status={booking.payment}
                        />
                      </td>

                      <td className="px-6 py-5">
                        <StatusBadge
                          status={booking.status}
                        />
                      </td>

                      <td className="px-6 py-5 text-right font-black">
                        {currency(booking.amount)}
                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          </div>

          {/* Upcoming Trips */}

          <div className="rounded-[28px] border border-slate-200 bg-white p-6">

            <div className="flex items-center justify-between">

              <div>
                <h2 className="text-xl font-black">
                  Upcoming Trips
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Next departures
                </p>
              </div>

              <button className="text-sm font-bold">
                View All
              </button>

            </div>

            <div className="mt-5 space-y-3">

              {upcomingTrips.map((trip) => (

                <div
                  key={trip.customer}
                  className="rounded-xl border border-slate-100 p-4"
                >

                  <div className="flex items-center justify-between">

                    <div>

                      <p className="font-bold">
                        {trip.destination}
                      </p>

                      <p className="mt-1 text-xs text-slate-500">
                        {trip.customer}
                      </p>

                    </div>

                    <div className="text-right">

                      <p className="text-sm font-bold">
                        {trip.date}
                      </p>

                      <p className="mt-1 text-xs text-slate-500">
                        In {trip.days} days
                      </p>

                    </div>

                  </div>

                  <div className="mt-3">
                    <StatusBadge status={trip.status} />
                  </div>

                </div>

              ))}

            </div>

          </div>

        </div>

        {/* =================================================
            DESTINATIONS + SALES
        ================================================= */}

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">

          {/* Top Destinations */}

          <div className="rounded-[28px] border border-slate-200 bg-white p-6">

            <SectionHeading
              title="Top Destinations"
              description="Best performing destinations"
            />

            <div className="mt-6 h-[300px]">

              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={destinationData}
                  layout="vertical"
                >

                  <CartesianGrid
                    strokeDasharray="3 3"
                    horizontal={false}
                  />

                  <XAxis type="number" />

                  <YAxis
                    dataKey="name"
                    type="category"
                    width={80}
                  />

                  <Tooltip />

                  <Bar
                    dataKey="bookings"
                    fill="#111827"
                    radius={[0, 8, 8, 0]}
                  />

                </BarChart>
              </ResponsiveContainer>

            </div>

          </div>

          {/* Sales Performance */}

          <div className="rounded-[28px] border border-slate-200 bg-white p-6">

            <SectionHeading
              title="Sales Performance"
              description="Bookings vs enquiries"
            />

            <div className="mt-6 h-[300px]">

              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyData}>

                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                  />

                  <XAxis dataKey="month" />

                  <YAxis />

                  <Tooltip />

                  <Line
                    type="monotone"
                    dataKey="bookings"
                    stroke="#111827"
                    strokeWidth={3}
                    dot={false}
                  />

                  <Line
                    type="monotone"
                    dataKey="enquiries"
                    stroke="#94a3b8"
                    strokeWidth={3}
                    dot={false}
                  />

                </LineChart>
              </ResponsiveContainer>

            </div>

            <div className="mt-4 flex gap-6">

              <LegendItem
                label="Bookings"
                dark
              />

              <LegendItem label="Enquiries" />

            </div>

          </div>

        </div>

        {/* =================================================
            QUICK ACTIONS
        ================================================= */}

        <div className="rounded-[28px] border border-slate-200 bg-slate-950 p-6 text-white">

          <div className="mb-5">

            <h2 className="text-xl font-black">
              Quick Actions
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              Frequently used actions
            </p>

          </div>

          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">

            {[
              "New Booking",
              "New Enquiry",
              "Add Customer",
              "Create Quotation",
              "Record Payment",
              "Add Package",
            ].map((action) => (

              <button
                key={action}
                className="rounded-xl border border-white/10 bg-white/5 px-4 py-4 text-left text-sm font-bold transition hover:bg-white/10"
              >
                <span className="mb-2 block text-lg">
                  +
                </span>

                {action}

              </button>

            ))}

          </div>

        </div>

        {/* =================================================
            FOOTER
        ================================================= */}

        <div className="flex flex-col justify-between gap-2 border-t border-slate-200 pt-5 text-xs text-slate-400 sm:flex-row">

          <p>
            Travel CRM Dashboard
          </p>

          <p>
            Last updated just now
          </p>

        </div>

      </div>
    </div>
  );
}

/* =========================================================
   COMPONENTS
========================================================= */

function StatCard({
  title,
  value,
  change,
  description,
  icon,
}) {
  return (
    <div className="rounded-[26px] border border-slate-200 bg-white p-5 transition hover:-translate-y-0.5 hover:shadow-lg">

      <div className="flex items-start justify-between">

        <div>

          <p className="text-sm font-medium text-slate-500">
            {title}
          </p>

          <h2 className="mt-3 text-3xl font-black tracking-tight">
            {value}
          </h2>

        </div>

        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-lg font-black">
          {icon}
        </div>

      </div>

      <div className="mt-4 flex items-center gap-2">

        <span className="rounded-full bg-slate-100 px-2 py-1 text-xs font-bold text-slate-800">
          ↑ {change}
        </span>

        <span className="text-xs text-slate-400">
          {description}
        </span>

      </div>

    </div>
  );
}

function MiniStat({ title, value }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white px-4 py-5">

      <p className="text-xs font-medium text-slate-500">
        {title}
      </p>

      <p className="mt-2 text-xl font-black">
        {value}
      </p>

    </div>
  );
}

function AttentionCard({
  title,
  value,
  count,
  icon,
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">

      <div className="flex items-start justify-between">

        <div>

          <p className="text-sm font-medium text-slate-500">
            {title}
          </p>

          <p className="mt-2 text-2xl font-black">
            {value}
          </p>

          <p className="mt-1 text-xs text-slate-400">
            {count}
          </p>

        </div>

        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 font-black">
          {icon}
        </div>

      </div>

    </div>
  );
}

function OperationCard({ title, value }) {
  return (
    <div className="rounded-xl bg-slate-50 p-4">

      <p className="text-xs text-slate-500">
        {title}
      </p>

      <p className="mt-1 text-2xl font-black">
        {value}
      </p>

    </div>
  );
}

function FinanceCard({ title, value }) {
  return (
    <div className="rounded-2xl bg-slate-50 p-5">

      <p className="text-sm text-slate-500">
        {title}
      </p>

      <p className="mt-2 text-2xl font-black">
        {value}
      </p>

    </div>
  );
}

function SectionHeading({ title, description }) {
  return (
    <div>
      <h2 className="text-xl font-black text-slate-950">
        {title}
      </h2>

      <p className="mt-1 text-sm text-slate-500">
        {description}
      </p>
    </div>
  );
}

function StatusBadge({ status }) {
  const styles = {
    Confirmed: "bg-emerald-50 text-emerald-700",
    Pending: "bg-amber-50 text-amber-700",
    Completed: "bg-slate-100 text-slate-700",
    Cancelled: "bg-red-50 text-red-700",
  };

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ${
        styles[status] || "bg-slate-100 text-slate-600"
      }`}
    >
      {status}
    </span>
  );
}

function PaymentBadge({ status }) {
  const styles = {
    Paid: "bg-emerald-50 text-emerald-700",
    Partial: "bg-amber-50 text-amber-700",
    Pending: "bg-red-50 text-red-700",
  };

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ${
        styles[status] || "bg-slate-100 text-slate-600"
      }`}
    >
      {status}
    </span>
  );
}

function PriorityBadge({ priority }) {
  const styles = {
    High: "bg-red-50 text-red-700",
    Medium: "bg-amber-50 text-amber-700",
    Low: "bg-slate-100 text-slate-600",
  };

  return (
    <span
      className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${
        styles[priority]
      }`}
    >
      {priority}
    </span>
  );
}

function LegendItem({ label, dark }) {
  return (
    <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">

      <span
        className={`h-2.5 w-2.5 rounded-full ${
          dark ? "bg-slate-950" : "bg-slate-400"
        }`}
      />

      {label}

    </div>
  );
}