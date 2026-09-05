"use client";

import { useEffect, useMemo, useState } from "react";

import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts";

import bookingApi from "../../../api/bookingApi";
import { getCustomers } from "../../../api/customerApi";
import packageApi from "../../../api/packageApi";
import destinationApi from "../../../api/destinationApi";

/* =========================================================
   HELPERS
========================================================= */

const formatCurrency = (value) => {
  const number = Number(value || 0);

  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(number);
};

const formatNumber = (value) => {
  return new Intl.NumberFormat("en-IN").format(Number(value || 0));
};

const getBookingId = (booking) =>
  booking?.id ??
  booking?.booking_id ??
  booking?.bookingId;

const getCustomerName = (booking) =>
  booking?.customer_name ||
  booking?.customerName ||
  booking?.customer?.name ||
  "Unknown Customer";

const getPackageName = (booking) =>
  booking?.package_name ||
  booking?.packageName ||
  booking?.package?.name ||
  booking?.package?.title ||
  "Package";

const getDestinationName = (booking) =>
  booking?.destination_name ||
  booking?.destinationName ||
  booking?.destination?.name ||
  booking?.destination?.country ||
  "Destination";

const getStatus = (booking) =>
  String(booking?.status || "PENDING").toUpperCase();

const getPaymentStatus = (booking) =>
  String(
    booking?.payment_status ||
      booking?.paymentStatus ||
      "UNPAID"
  ).toUpperCase();

const getTotalAmount = (booking) =>
  Number(
    booking?.total_amount ??
      booking?.totalAmount ??
      booking?.amount ??
      0
  );

const getPaidAmount = (booking) =>
  Number(
    booking?.paid_amount ??
      booking?.paidAmount ??
      0
  );

const getDueAmount = (booking) => {
  const direct =
    booking?.due_amount ??
    booking?.dueAmount;

  if (direct !== undefined && direct !== null) {
    return Number(direct);
  }

  return Math.max(
    getTotalAmount(booking) - getPaidAmount(booking),
    0
  );
};

const getTravelStartDate = (booking) =>
  booking?.travel_start_date ||
  booking?.travelStartDate ||
  booking?.start_date ||
  booking?.startDate;

const formatDate = (date) => {
  if (!date) return "-";

  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) {
    return date;
  }

  return parsed.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const getInitials = (name = "") => {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((item) => item[0])
    .join("")
    .toUpperCase();
};

/* =========================================================
   MAIN DASHBOARD
========================================================= */

export default function Dashboard() {
  const [open, setOpen] = useState(false);

  const [bookings, setBookings] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [packages, setPackages] = useState([]);
  const [destinations, setDestinations] = useState([]);

  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(null);

  const [dateFilter, setDateFilter] = useState("all");
  const [search, setSearch] = useState("");

  /* =======================================================
     LOAD DATA
  ======================================================= */

  const loadDashboard = async () => {
    try {
      setLoading(true);

      const [
        bookingResponse,
        customerResponse,
        packageResponse,
        destinationResponse,
      ] = await Promise.all([
        bookingApi.getBookings({
          page: 1,
          limit: 1000,
        }),

        getCustomers({
          page: 1,
          limit: 1000,
          status: "All",
        }),

        packageApi.getPackages({
          page: 1,
          limit: 1000,
        }),

        destinationApi.getDestinations({
          page: 1,
          limit: 1000,
        }),
      ]);

      const bookingData = Array.isArray(bookingResponse)
        ? bookingResponse
        : bookingResponse?.data ||
          bookingResponse?.bookings ||
          [];

      const customerData = Array.isArray(customerResponse)
        ? customerResponse
        : customerResponse?.data ||
          customerResponse?.customers ||
          [];

      const packageData = Array.isArray(packageResponse)
        ? packageResponse
        : packageResponse?.data ||
          packageResponse?.packages ||
          [];

      const destinationData = Array.isArray(
        destinationResponse
      )
        ? destinationResponse
        : destinationResponse?.data ||
          destinationResponse?.destinations ||
          [];

      setBookings(
        Array.isArray(bookingData)
          ? bookingData
          : []
      );

      setCustomers(
        Array.isArray(customerData)
          ? customerData
          : []
      );

      setPackages(
        Array.isArray(packageData)
          ? packageData
          : []
      );

      setDestinations(
        Array.isArray(destinationData)
          ? destinationData
          : []
      );

      setLastUpdated(new Date());
    } catch (error) {
      console.error(
        "Failed to load dashboard:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboard();

    /*
      Refresh dashboard every 60 seconds.
      Remove this if you don't want automatic refresh.
    */
    const interval = setInterval(
      loadDashboard,
      60000
    );

    return () => clearInterval(interval);
  }, []);

  /* =======================================================
     DATE FILTER
  ======================================================= */

  const filteredBookings = useMemo(() => {
    const now = new Date();

    return bookings.filter((booking) => {
      const bookingDate =
        getTravelStartDate(booking);

      if (!bookingDate) {
        return dateFilter === "all";
      }

      const date = new Date(bookingDate);

      if (Number.isNaN(date.getTime())) {
        return true;
      }

      if (dateFilter === "today") {
        return (
          date.toDateString() ===
          now.toDateString()
        );
      }

      if (dateFilter === "7days") {
        const next = new Date(now);
        next.setDate(
          now.getDate() + 7
        );

        return date >= now && date <= next;
      }

      if (dateFilter === "30days") {
        const next = new Date(now);
        next.setDate(
          now.getDate() + 30
        );

        return date >= now && date <= next;
      }

      return true;
    });
  }, [bookings, dateFilter]);

  /* =======================================================
     SEARCH
  ======================================================= */

  const searchedBookings = useMemo(() => {
    const keyword =
      search.toLowerCase().trim();

    if (!keyword) {
      return filteredBookings;
    }

    return filteredBookings.filter(
      (booking) => {
        return (
          String(
            booking?.booking_id ||
              booking?.bookingId ||
              ""
          )
            .toLowerCase()
            .includes(keyword) ||
          getCustomerName(booking)
            .toLowerCase()
            .includes(keyword) ||
          getPackageName(booking)
            .toLowerCase()
            .includes(keyword) ||
          getDestinationName(booking)
            .toLowerCase()
            .includes(keyword)
        );
      }
    );
  }, [filteredBookings, search]);

  /* =======================================================
     KPI CALCULATIONS
  ======================================================= */

  const stats = useMemo(() => {
    const totalBookings =
      bookings.length;

    const confirmed = bookings.filter(
      (item) =>
        getStatus(item) === "CONFIRMED"
    ).length;

    const pending = bookings.filter(
      (item) =>
        getStatus(item) === "PENDING"
    ).length;

    const completed = bookings.filter(
      (item) =>
        getStatus(item) === "COMPLETED"
    ).length;

    const cancelled = bookings.filter(
      (item) =>
        getStatus(item) === "CANCELLED"
    ).length;

    const revenue = bookings.reduce(
      (sum, booking) =>
        sum + getTotalAmount(booking),
      0
    );

    const collected = bookings.reduce(
      (sum, booking) =>
        sum + getPaidAmount(booking),
      0
    );

    const due = bookings.reduce(
      (sum, booking) =>
        sum + getDueAmount(booking),
      0
    );

    return {
      totalBookings,
      confirmed,
      pending,
      completed,
      cancelled,
      revenue,
      collected,
      due,
      customers: customers.length,
      packages: packages.length,
      destinations: destinations.length,
    };
  }, [
    bookings,
    customers,
    packages,
    destinations,
  ]);

  /* =======================================================
     STATUS DATA
  ======================================================= */

  const statusData = useMemo(() => {
    return [
      {
        name: "Confirmed",
        value: stats.confirmed,
      },
      {
        name: "Pending",
        value: stats.pending,
      },
      {
        name: "Completed",
        value: stats.completed,
      },
      {
        name: "Cancelled",
        value: stats.cancelled,
      },
    ].filter((item) => item.value > 0);
  }, [stats]);

  /* =======================================================
     MONTHLY ANALYTICS
  ======================================================= */

  const monthlyData = useMemo(() => {
    const months = [];

    for (let i = 5; i >= 0; i--) {
      const date = new Date();

      date.setMonth(
        date.getMonth() - i
      );

      const month = date.toLocaleDateString(
        "en-IN",
        {
          month: "short",
        }
      );

      const year = date.getFullYear();
      const monthIndex =
        date.getMonth();

      let monthlyBookings = 0;
      let monthlyRevenue = 0;

      bookings.forEach((booking) => {
        const bookingDate =
          getTravelStartDate(booking);

        if (!bookingDate) return;

        const parsed = new Date(
          bookingDate
        );

        if (
          parsed.getFullYear() === year &&
          parsed.getMonth() === monthIndex
        ) {
          monthlyBookings += 1;
          monthlyRevenue +=
            getTotalAmount(booking);
        }
      });

      months.push({
        month,
        bookings: monthlyBookings,
        revenue: monthlyRevenue,
      });
    }

    return months;
  }, [bookings]);

  /* =======================================================
     TOP DESTINATIONS
  ======================================================= */

  const topDestinations = useMemo(() => {
    const map = {};

    bookings.forEach((booking) => {
      const destination =
        getDestinationName(booking);

      if (!map[destination]) {
        map[destination] = 0;
      }

      map[destination]++;
    });

    return Object.entries(map)
      .map(([name, count]) => ({
        name,
        bookings: count,
      }))
      .sort(
        (a, b) =>
          b.bookings - a.bookings
      )
      .slice(0, 5);
  }, [bookings]);

  /* =======================================================
     TOP PACKAGES
  ======================================================= */

  const topPackages = useMemo(() => {
    const map = {};

    bookings.forEach((booking) => {
      const packageName =
        getPackageName(booking);

      if (!map[packageName]) {
        map[packageName] = 0;
      }

      map[packageName]++;
    });

    return Object.entries(map)
      .map(([name, count]) => ({
        name,
        bookings: count,
      }))
      .sort(
        (a, b) =>
          b.bookings - a.bookings
      )
      .slice(0, 5);
  }, [bookings]);

  /* =======================================================
     UPCOMING BOOKINGS
  ======================================================= */

  const upcomingBookings = useMemo(() => {
    const now = new Date();

    return bookings
      .filter((booking) => {
        const date =
          getTravelStartDate(booking);

        if (!date) return false;

        const parsed = new Date(date);

        return (
          !Number.isNaN(
            parsed.getTime()
          ) && parsed >= now
        );
      })
      .sort(
        (a, b) =>
          new Date(
            getTravelStartDate(a)
          ) -
          new Date(
            getTravelStartDate(b)
          )
      )
      .slice(0, 6);
  }, [bookings]);

  /* =======================================================
     RECENT BOOKINGS
  ======================================================= */

  const recentBookings = useMemo(() => {
    return [...bookings]
      .sort((a, b) => {
        const aDate = new Date(
          a.created_at ||
            a.createdAt ||
            getTravelStartDate(a) ||
            0
        );

        const bDate = new Date(
          b.created_at ||
            b.createdAt ||
            getTravelStartDate(b) ||
            0
        );

        return bDate - aDate;
      })
      .slice(0, 8);
  }, [bookings]);

  /* =======================================================
     PAYMENT ANALYTICS
  ======================================================= */

  const paymentStats = useMemo(() => {
    const paid = bookings.filter(
      (booking) =>
        getPaymentStatus(booking) ===
        "PAID"
    ).length;

    const partial = bookings.filter(
      (booking) =>
        getPaymentStatus(booking) ===
        "PARTIAL"
    ).length;

    const unpaid = bookings.filter(
      (booking) =>
        getPaymentStatus(booking) ===
        "UNPAID"
    ).length;

    const refunded = bookings.filter(
      (booking) =>
        getPaymentStatus(booking) ===
        "REFUNDED"
    ).length;

    return {
      paid,
      partial,
      unpaid,
      refunded,
    };
  }, [bookings]);

  /* =======================================================
     ATTENTION REQUIRED
  ======================================================= */

  const attention = useMemo(() => {
    const overduePayments =
      bookings.filter(
        (booking) =>
          getDueAmount(booking) > 0 &&
          getStatus(booking) !==
            "CANCELLED"
      );

    const pendingBookings =
      bookings.filter(
        (booking) =>
          getStatus(booking) ===
          "PENDING"
      );

    const cancelledBookings =
      bookings.filter(
        (booking) =>
          getStatus(booking) ===
          "CANCELLED"
      );

    return {
      overduePayments,
      pendingBookings,
      cancelledBookings,
    };
  }, [bookings]);

  /* =======================================================
     LOADING
  ======================================================= */

  if (loading && bookings.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-indigo-200 border-t-indigo-600" />
          <p className="text-sm text-slate-500">
            Loading Travel CRM...
          </p>
        </div>
      </div>
    );
  }

  /* =======================================================
     UI
  ======================================================= */

  return (
    <div className="min-h-screen bg-[#f5f7fb] text-slate-800">
      {/* =================================================
          MOBILE SIDEBAR OVERLAY
      ================================================= */}

      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
        />
      )}

      {/* =================================================
          SIDEBAR
      ================================================= */}

      <aside
        className={`
          fixed left-0 top-0 z-50 flex h-screen w-64
          flex-col bg-slate-950 text-white
          transition-transform duration-300
          ${
            open
              ? "translate-x-0"
              : "-translate-x-full md:translate-x-0"
          }
        `}
      >
        {/* Logo */}

        <div className="flex h-16 items-center justify-between border-b border-white/10 px-5">
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-lg">
                ✈
              </div>

              <div>
                <h1 className="font-bold">
                  Travel CRM
                </h1>

                <p className="text-[10px] uppercase tracking-widest text-slate-400">
                  Admin Center
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={() => setOpen(false)}
            className="text-xl text-slate-400 md:hidden"
          >
            ×
          </button>
        </div>

        {/* Navigation */}

        <nav className="flex-1 space-y-1 overflow-y-auto p-4">
          <SidebarItem
            icon="▦"
            label="Dashboard"
            active
          />

          <SidebarItem
            icon="▣"
            label="Bookings"
          />

          <SidebarItem
            icon="◉"
            label="Enquiries"
          />

          <SidebarItem
            icon="♙"
            label="Customers"
          />

          <SidebarItem
            icon="✈"
            label="Trips"
          />

          <SidebarItem
            icon="◫"
            label="Packages"
          />

          <SidebarItem
            icon="⌖"
            label="Destinations"
          />

          <SidebarItem
            icon="₹"
            label="Payments"
          />

          <SidebarItem
            icon="▤"
            label="Quotations"
          />

          <SidebarItem
            icon="▥"
            label="Reports"
          />

          <div className="my-5 border-t border-white/10" />

          <p className="px-3 pb-2 text-[10px] font-semibold uppercase tracking-widest text-slate-500">
            Management
          </p>

          <SidebarItem
            icon="⚙"
            label="Settings"
          />

          <SidebarItem
            icon="?"
            label="Support"
          />
        </nav>

        {/* User */}

        <div className="border-t border-white/10 p-4">
          <div className="flex items-center gap-3 rounded-xl bg-white/5 p-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-600 text-xs font-bold">
              A
            </div>

            <div className="min-w-0">
              <p className="truncate text-sm font-medium">
                Administrator
              </p>

              <p className="truncate text-xs text-slate-400">
                Travel Manager
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* =================================================
          MAIN
      ================================================= */}

      <div className="md:ml-64">
        {/* =================================================
            TOP BAR
        ================================================= */}

        <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
          <div className="flex h-16 items-center justify-between gap-4 px-4 md:px-7">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setOpen(true)}
                className="rounded-lg border border-slate-200 p-2 md:hidden"
              >
                ☰
              </button>

              <div>
                <h2 className="font-semibold text-slate-900">
                  Dashboard
                </h2>

                <p className="hidden text-xs text-slate-500 sm:block">
                  Travel business command center
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* Search */}

              <div className="hidden lg:block">
                <div className="flex w-64 items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2">
                  <span className="text-slate-400">
                    ⌕
                  </span>

                  <input
                    value={search}
                    onChange={(e) =>
                      setSearch(
                        e.target.value
                      )
                    }
                    placeholder="Search bookings..."
                    className="w-full bg-transparent text-sm outline-none"
                  />
                </div>
              </div>

              {/* Refresh */}

              <button
                onClick={loadDashboard}
                className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm hover:bg-slate-50"
                title="Refresh dashboard"
              >
                ↻
              </button>

              {/* Notification */}

              <button className="relative rounded-xl border border-slate-200 bg-white px-3 py-2 hover:bg-slate-50">
                🔔

                {attention.overduePayments
                  .length > 0 && (
                  <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500" />
                )}
              </button>

              {/* Admin */}

              <div className="hidden items-center gap-2 border-l border-slate-200 pl-3 sm:flex">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100 text-sm font-bold text-indigo-700">
                  A
                </div>

                <div>
                  <p className="text-sm font-semibold">
                    Admin
                  </p>

                  <p className="text-[11px] text-slate-400">
                    Online
                  </p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* =================================================
            CONTENT
        ================================================= */}

        <main className="space-y-6 p-4 md:p-7">
          {/* =================================================
              WELCOME
          ================================================= */}

          <section className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
            <div>
              <p className="text-sm font-medium text-indigo-600">
                {new Date().toLocaleDateString(
                  "en-IN",
                  {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                  }
                )}
              </p>

              <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
                Good morning, Admin 👋
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                Here's what's happening with
                your travel business today.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <button className="rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700">
                + New Booking
              </button>

              <button className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50">
                + New Enquiry
              </button>

              <button className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50">
                + Customer
              </button>
            </div>
          </section>

          {/* =================================================
              KPI CARDS
          ================================================= */}

          <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <MetricCard
              title="Total Bookings"
              value={formatNumber(
                stats.totalBookings
              )}
              icon="▣"
              description="All bookings"
              iconBg="bg-indigo-100"
              iconColor="text-indigo-600"
            />

            <MetricCard
              title="Total Revenue"
              value={formatCurrency(
                stats.revenue
              )}
              icon="₹"
              description="Booking value"
              iconBg="bg-emerald-100"
              iconColor="text-emerald-600"
            />

            <MetricCard
              title="Customers"
              value={formatNumber(
                stats.customers
              )}
              icon="♙"
              description="Registered customers"
              iconBg="bg-blue-100"
              iconColor="text-blue-600"
            />

            <MetricCard
              title="Pending Collection"
              value={formatCurrency(
                stats.due
              )}
              icon="!"
              description="Amount to collect"
              iconBg="bg-rose-100"
              iconColor="text-rose-600"
            />
          </section>

          {/* =================================================
              SECONDARY KPI
          ================================================= */}

          <section className="grid grid-cols-2 gap-4 lg:grid-cols-5">
            <MiniMetric
              label="Confirmed"
              value={stats.confirmed}
              icon="✓"
              type="success"
            />

            <MiniMetric
              label="Pending"
              value={stats.pending}
              icon="◷"
              type="warning"
            />

            <MiniMetric
              label="Completed"
              value={stats.completed}
              icon="★"
              type="info"
            />

            <MiniMetric
              label="Cancelled"
              value={stats.cancelled}
              icon="×"
              type="danger"
            />

            <MiniMetric
              label="Packages"
              value={stats.packages}
              icon="▤"
              type="default"
            />
          </section>

          {/* =================================================
              ATTENTION REQUIRED
          ================================================= */}

          <section className="rounded-2xl border border-amber-200 bg-gradient-to-r from-amber-50 to-white p-5">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="font-bold text-slate-900">
                  Attention Required
                </h2>

                <p className="text-xs text-slate-500">
                  Items that may need admin action
                </p>
              </div>

              <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">
                {
                  attention.overduePayments
                    .length +
                    attention.pendingBookings
                      .length
                }{" "}
                items
              </span>
            </div>

            <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
              <AttentionCard
                title="Pending Payments"
                value={
                  attention.overduePayments
                    .length
                }
                amount={formatCurrency(
                  attention.overduePayments.reduce(
                    (sum, booking) =>
                      sum +
                      getDueAmount(
                        booking
                      ),
                    0
                  )
                )}
                icon="₹"
                type="danger"
              />

              <AttentionCard
                title="Pending Bookings"
                value={
                  attention.pendingBookings
                    .length
                }
                amount="Need confirmation"
                icon="◷"
                type="warning"
              />

              <AttentionCard
                title="Cancelled Bookings"
                value={
                  attention.cancelledBookings
                    .length
                }
                amount="Review if required"
                icon="×"
                type="default"
              />
            </div>
          </section>

          {/* =================================================
              ANALYTICS
          ================================================= */}

          <section className="grid grid-cols-1 gap-5 xl:grid-cols-3">
            {/* Revenue */}

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm xl:col-span-2">
              <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                <div>
                  <h2 className="font-bold text-slate-900">
                    Revenue & Bookings
                  </h2>

                  <p className="text-xs text-slate-500">
                    Business performance over the
                    last 6 months
                  </p>
                </div>

                <select
                  value={dateFilter}
                  onChange={(e) =>
                    setDateFilter(
                      e.target.value
                    )
                  }
                  className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs outline-none"
                >
                  <option value="all">
                    All Data
                  </option>

                  <option value="today">
                    Today
                  </option>

                  <option value="7days">
                    Next 7 Days
                  </option>

                  <option value="30days">
                    Next 30 Days
                  </option>
                </select>
              </div>

              <div className="h-[300px]">
                <ResponsiveContainer
                  width="100%"
                  height="100%"
                >
                  <AreaChart
                    data={monthlyData}
                  >
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
                          stopColor="#4f46e5"
                          stopOpacity={0.2}
                        />

                        <stop
                          offset="95%"
                          stopColor="#4f46e5"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>

                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                      stroke="#e2e8f0"
                    />

                    <XAxis
                      dataKey="month"
                      axisLine={false}
                      tickLine={false}
                      tick={{
                        fontSize: 12,
                        fill: "#64748b",
                      }}
                    />

                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{
                        fontSize: 11,
                        fill: "#64748b",
                      }}
                    />

                    <Tooltip />

                    <Area
                      type="monotone"
                      dataKey="revenue"
                      stroke="#4f46e5"
                      strokeWidth={2}
                      fill="url(#revenueGradient)"
                      name="Revenue"
                    />

                    <Line
                      type="monotone"
                      dataKey="bookings"
                      stroke="#0f172a"
                      strokeWidth={2}
                      dot={false}
                      name="Bookings"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Status */}

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="mb-4">
                <h2 className="font-bold text-slate-900">
                  Booking Status
                </h2>

                <p className="text-xs text-slate-500">
                  Current booking distribution
                </p>
              </div>

              <div className="h-[220px]">
                {statusData.length > 0 ? (
                  <ResponsiveContainer
                    width="100%"
                    height="100%"
                  >
                    <PieChart>
                      <Pie
                        data={statusData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        innerRadius={55}
                        outerRadius={85}
                        paddingAngle={3}
                      >
                        {statusData.map(
                          (entry, index) => {
                            const colors = [
                              "#22c55e",
                              "#f59e0b",
                              "#3b82f6",
                              "#ef4444",
                            ];

                            return (
                              <Cell
                                key={entry.name}
                                fill={
                                  colors[
                                    index %
                                      colors.length
                                  ]
                                }
                              />
                            );
                          }
                        )}
                      </Pie>

                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <EmptyState text="No booking data" />
                )}
              </div>

              <div className="space-y-3">
                {statusData.map((item) => (
                  <div
                    key={item.name}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <span className="h-2.5 w-2.5 rounded-full bg-indigo-500" />

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
          </section>

          {/* =================================================
              PAYMENT + OPERATIONS
          ================================================= */}

          <section className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            {/* Payment */}

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="mb-5">
                <h2 className="font-bold text-slate-900">
                  Payment Overview
                </h2>

                <p className="text-xs text-slate-500">
                  Collection health
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <PaymentBox
                  label="Collected"
                  value={formatCurrency(
                    stats.collected
                  )}
                  icon="✓"
                  type="success"
                />

                <PaymentBox
                  label="Outstanding"
                  value={formatCurrency(
                    stats.due
                  )}
                  icon="₹"
                  type="danger"
                />

                <PaymentBox
                  label="Paid Bookings"
                  value={paymentStats.paid}
                  icon="✓"
                  type="success"
                />

                <PaymentBox
                  label="Partial / Unpaid"
                  value={
                    paymentStats.partial +
                    paymentStats.unpaid
                  }
                  icon="◷"
                  type="warning"
                />
              </div>

              <div className="mt-5">
                <div className="mb-2 flex justify-between text-xs">
                  <span className="text-slate-500">
                    Collection progress
                  </span>

                  <span className="font-semibold">
                    {stats.revenue > 0
                      ? Math.round(
                          (stats.collected /
                            stats.revenue) *
                            100
                        )
                      : 0}
                    %
                  </span>
                </div>

                <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-emerald-500"
                    style={{
                      width: `${
                        stats.revenue > 0
                          ? Math.min(
                              (stats.collected /
                                stats.revenue) *
                                100,
                              100
                            )
                          : 0
                      }%`,
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Operations */}

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="mb-5">
                <h2 className="font-bold text-slate-900">
                  Today's Operations
                </h2>

                <p className="text-xs text-slate-500">
                  What your team needs to know
                </p>
              </div>

              <div className="space-y-3">
                <OperationRow
                  icon="▣"
                  title="Total Bookings"
                  value={stats.totalBookings}
                  description="All active bookings"
                />

                <OperationRow
                  icon="✓"
                  title="Confirmed Trips"
                  value={stats.confirmed}
                  description="Ready for operation"
                />

                <OperationRow
                  icon="◷"
                  title="Pending Confirmation"
                  value={stats.pending}
                  description="Needs admin attention"
                />

                <OperationRow
                  icon="₹"
                  title="Payment Pending"
                  value={formatCurrency(
                    stats.due
                  )}
                  description="Collection required"
                />

                <OperationRow
                  icon="✈"
                  title="Upcoming Trips"
                  value={
                    upcomingBookings.length
                  }
                  description="Next departures"
                />
              </div>
            </div>
          </section>

          {/* =================================================
              RECENT BOOKINGS
          ================================================= */}

          <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="flex flex-col justify-between gap-3 border-b border-slate-100 p-5 sm:flex-row sm:items-center">
              <div>
                <h2 className="font-bold text-slate-900">
                  Recent Bookings
                </h2>

                <p className="text-xs text-slate-500">
                  Latest customer bookings
                </p>
              </div>

              <button className="text-sm font-semibold text-indigo-600 hover:text-indigo-700">
                View all →
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[850px] text-left text-sm">
                <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
                  <tr>
                    <th className="px-5 py-3">
                      Booking
                    </th>

                    <th className="px-5 py-3">
                      Customer
                    </th>

                    <th className="px-5 py-3">
                      Destination
                    </th>

                    <th className="px-5 py-3">
                      Travel Date
                    </th>

                    <th className="px-5 py-3">
                      Amount
                    </th>

                    <th className="px-5 py-3">
                      Payment
                    </th>

                    <th className="px-5 py-3">
                      Status
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {recentBookings.map(
                    (booking, index) => (
                      <BookingRow
                        key={
                          getBookingId(
                            booking
                          ) ??
                          index
                        }
                        booking={booking}
                      />
                    )
                  )}
                </tbody>
              </table>

              {recentBookings.length ===
                0 && (
                <EmptyState text="No bookings found" />
              )}
            </div>
          </section>

          {/* =================================================
              UPCOMING + ENQUIRIES STYLE
          ================================================= */}

          <section className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            {/* Upcoming Trips */}

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <h2 className="font-bold text-slate-900">
                    Upcoming Trips
                  </h2>

                  <p className="text-xs text-slate-500">
                    Next customer departures
                  </p>
                </div>

                <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-600">
                  {
                    upcomingBookings.length
                  }
                </span>
              </div>

              <div className="space-y-3">
                {upcomingBookings.length >
                0 ? (
                  upcomingBookings.map(
                    (
                      booking,
                      index
                    ) => (
                      <div
                        key={
                          getBookingId(
                            booking
                          ) ??
                          index
                        }
                        className="flex items-center gap-3 rounded-xl border border-slate-100 p-3 transition hover:bg-slate-50"
                      >
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                          ✈
                        </div>

                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-semibold text-slate-900">
                            {getDestinationName(
                              booking
                            )}
                          </p>

                          <p className="truncate text-xs text-slate-500">
                            {getCustomerName(
                              booking
                            )}{" "}
                            •{" "}
                            {getPackageName(
                              booking
                            )}
                          </p>
                        </div>

                        <div className="text-right">
                          <p className="text-xs font-semibold text-slate-900">
                            {formatDate(
                              getTravelStartDate(
                                booking
                              )
                            )}
                          </p>

                          <p className="mt-1 text-[11px] text-slate-400">
                            {booking?.traveler_count ??
                              booking?.travelerCount ??
                              1}{" "}
                            traveler(s)
                          </p>
                        </div>
                      </div>
                    )
                  )
                ) : (
                  <EmptyState text="No upcoming trips" />
                )}
              </div>
            </div>

            {/* CRM Follow-up */}

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="mb-5">
                <h2 className="font-bold text-slate-900">
                  CRM Follow-up Center
                </h2>

                <p className="text-xs text-slate-500">
                  Leads and customers requiring attention
                </p>
              </div>

              <div className="space-y-3">
                <CRMItem
                  icon="🔥"
                  title="High Priority Leads"
                  value="Review"
                  description="Follow up with your hottest enquiries"
                />

                <CRMItem
                  icon="📞"
                  title="Follow-ups"
                  value="Today"
                  description="Customers waiting for a response"
                />

                <CRMItem
                  icon="₹"
                  title="Payment Follow-ups"
                  value={formatCurrency(
                    stats.due
                  )}
                  description="Customers with outstanding balance"
                />

                <CRMItem
                  icon="▤"
                  title="Quotations"
                  value="Pending"
                  description="Quotes waiting for customer response"
                />
              </div>
            </div>
          </section>

          {/* =================================================
              DESTINATIONS + PACKAGES
          ================================================= */}

          <section className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            {/* Destinations */}

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <h2 className="font-bold text-slate-900">
                    Top Destinations
                  </h2>

                  <p className="text-xs text-slate-500">
                    Most booked destinations
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {topDestinations.length >
                0 ? (
                  topDestinations.map(
                    (
                      item,
                      index
                    ) => {
                      const max =
                        topDestinations[0]
                          ?.bookings ||
                        1;

                      return (
                        <div
                          key={item.name}
                        >
                          <div className="mb-1.5 flex justify-between text-sm">
                            <span className="font-medium">
                              {index + 1}.{" "}
                              {item.name}
                            </span>

                            <span className="font-semibold text-slate-500">
                              {
                                item.bookings
                              }
                            </span>
                          </div>

                          <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                            <div
                              className="h-full rounded-full bg-indigo-500"
                              style={{
                                width: `${
                                  (item.bookings /
                                    max) *
                                  100
                                }%`,
                              }}
                            />
                          </div>
                        </div>
                      );
                    }
                  )
                ) : (
                  <EmptyState text="No destination data" />
                )}
              </div>
            </div>

            {/* Packages */}

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="mb-5">
                <h2 className="font-bold text-slate-900">
                  Top Packages
                </h2>

                <p className="text-xs text-slate-500">
                  Best performing packages
                </p>
              </div>

              <div className="space-y-3">
                {topPackages.length >
                0 ? (
                  topPackages.map(
                    (
                      item,
                      index
                    ) => (
                      <div
                        key={item.name}
                        className="flex items-center gap-3 rounded-xl bg-slate-50 p-3"
                      >
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-xs font-bold text-indigo-600 shadow-sm">
                          #{index + 1}
                        </div>

                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-semibold text-slate-800">
                            {item.name}
                          </p>

                          <p className="text-xs text-slate-500">
                            {
                              item.bookings
                            }{" "}
                            bookings
                          </p>
                        </div>

                        <span className="text-lg">
                          ✈
                        </span>
                      </div>
                    )
                  )
                ) : (
                  <EmptyState text="No package data" />
                )}
              </div>
            </div>
          </section>

          {/* =================================================
              BUSINESS SUMMARY
          ================================================= */}

          <section className="rounded-2xl bg-slate-950 p-6 text-white shadow-xl">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
              <BusinessSummary
                label="Bookings"
                value={formatNumber(
                  stats.totalBookings
                )}
              />

              <BusinessSummary
                label="Revenue"
                value={formatCurrency(
                  stats.revenue
                )}
              />

              <BusinessSummary
                label="Collected"
                value={formatCurrency(
                  stats.collected
                )}
              />

              <BusinessSummary
                label="Outstanding"
                value={formatCurrency(
                  stats.due
                )}
              />
            </div>
          </section>

          {/* =================================================
              QUICK ACTIONS
          ================================================= */}

          <section>
            <div className="mb-4">
              <h2 className="font-bold text-slate-900">
                Quick Actions
              </h2>

              <p className="text-xs text-slate-500">
                Frequently used admin actions
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
              <QuickAction
                icon="▣"
                label="New Booking"
              />

              <QuickAction
                icon="♙"
                label="New Customer"
              />

              <QuickAction
                icon="◉"
                label="New Enquiry"
              />

              <QuickAction
                icon="▤"
                label="New Package"
              />

              <QuickAction
                icon="₹"
                label="Record Payment"
              />

              <QuickAction
                icon="▥"
                label="Create Quotation"
              />
            </div>
          </section>

          {/* =================================================
              FOOTER
          ================================================= */}

          <div className="flex flex-col justify-between gap-2 border-t border-slate-200 pt-5 text-xs text-slate-400 sm:flex-row">
            <p>
              Travel CRM Dashboard
            </p>

            <p>
              Last updated:{" "}
              {lastUpdated
                ? lastUpdated.toLocaleTimeString(
                    "en-IN"
                  )
                : "-"}
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}

/* =========================================================
   SIDEBAR ITEM
========================================================= */

function SidebarItem({
  icon,
  label,
  active = false,
}) {
  return (
    <button
      className={`
        flex w-full items-center gap-3 rounded-xl px-3 py-2.5
        text-left text-sm transition
        ${
          active
            ? "bg-indigo-600 text-white shadow-lg shadow-indigo-950/30"
            : "text-slate-400 hover:bg-white/5 hover:text-white"
        }
      `}
    >
      <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/5 text-sm">
        {icon}
      </span>

      <span>{label}</span>
    </button>
  );
}

/* =========================================================
   METRIC CARD
========================================================= */

function MetricCard({
  title,
  value,
  icon,
  description,
  iconBg,
  iconColor,
}) {
  return (
    <div className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
            {title}
          </p>

          <h3 className="mt-2 text-2xl font-bold tracking-tight text-slate-900">
            {value}
          </h3>

          <p className="mt-2 text-xs text-slate-400">
            {description}
          </p>
        </div>

        <div
          className={`flex h-11 w-11 items-center justify-center rounded-xl ${iconBg} ${iconColor} text-lg font-bold`}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   MINI METRIC
========================================================= */

function MiniMetric({
  label,
  value,
  icon,
  type = "default",
}) {
  const styles = {
    success:
      "bg-emerald-50 text-emerald-700",
    warning:
      "bg-amber-50 text-amber-700",
    info:
      "bg-blue-50 text-blue-700",
    danger:
      "bg-red-50 text-red-700",
    default:
      "bg-slate-100 text-slate-700",
  };

  return (
    <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div
        className={`flex h-9 w-9 items-center justify-center rounded-lg text-sm font-bold ${styles[type]}`}
      >
        {icon}
      </div>

      <div>
        <p className="text-xs text-slate-500">
          {label}
        </p>

        <p className="text-lg font-bold">
          {formatNumber(value)}
        </p>
      </div>
    </div>
  );
}

/* =========================================================
   ATTENTION CARD
========================================================= */

function AttentionCard({
  title,
  value,
  amount,
  icon,
  type,
}) {
  const styles = {
    danger:
      "bg-red-100 text-red-600",
    warning:
      "bg-amber-100 text-amber-600",
    default:
      "bg-slate-100 text-slate-600",
  };

  return (
    <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4">
      <div
        className={`flex h-10 w-10 items-center justify-center rounded-xl text-sm font-bold ${styles[type]}`}
      >
        {icon}
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-slate-800">
          {title}
        </p>

        <p className="text-xs text-slate-500">
          {amount}
        </p>
      </div>

      <span className="text-lg font-bold text-slate-800">
        {value}
      </span>
    </div>
  );
}

/* =========================================================
   PAYMENT BOX
========================================================= */

function PaymentBox({
  label,
  value,
  icon,
  type,
}) {
  const styles = {
    success:
      "bg-emerald-50 text-emerald-600",
    danger:
      "bg-red-50 text-red-600",
    warning:
      "bg-amber-50 text-amber-600",
  };

  return (
    <div className="rounded-xl border border-slate-100 p-4">
      <div className="flex items-center gap-2">
        <span
          className={`flex h-7 w-7 items-center justify-center rounded-lg text-xs font-bold ${styles[type]}`}
        >
          {icon}
        </span>

        <span className="text-xs text-slate-500">
          {label}
        </span>
      </div>

      <p className="mt-2 text-lg font-bold text-slate-900">
        {value}
      </p>
    </div>
  );
}

/* =========================================================
   OPERATION ROW
========================================================= */

function OperationRow({
  icon,
  title,
  value,
  description,
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-slate-100 p-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
        {icon}
      </div>

      <div className="flex-1">
        <p className="text-sm font-semibold">
          {title}
        </p>

        <p className="text-xs text-slate-400">
          {description}
        </p>
      </div>

      <p className="text-sm font-bold text-slate-900">
        {value}
      </p>
    </div>
  );
}

/* =========================================================
   BOOKING ROW
========================================================= */

function BookingRow({ booking }) {
  const status = getStatus(booking);
  const paymentStatus =
    getPaymentStatus(booking);

  return (
    <tr className="transition hover:bg-slate-50">
      <td className="px-5 py-4">
        <div>
          <p className="font-semibold text-slate-900">
            {booking?.booking_id ||
              booking?.bookingId ||
              `#${booking?.id}`}
          </p>

          <p className="mt-0.5 text-[11px] text-slate-400">
            {booking?.booking_source ||
              booking?.bookingSource ||
              "Direct"}
          </p>
        </div>
      </td>

      <td className="px-5 py-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 text-[10px] font-bold text-indigo-700">
            {getInitials(
              getCustomerName(booking)
            )}
          </div>

          <span className="font-medium">
            {getCustomerName(booking)}
          </span>
        </div>
      </td>

      <td className="px-5 py-4">
        <p className="font-medium">
          {getDestinationName(booking)}
        </p>

        <p className="text-xs text-slate-400">
          {getPackageName(booking)}
        </p>
      </td>

      <td className="px-5 py-4 text-slate-600">
        {formatDate(
          getTravelStartDate(booking)
        )}
      </td>

      <td className="px-5 py-4">
        <p className="font-semibold">
          {formatCurrency(
            getTotalAmount(booking)
          )}
        </p>

        <p className="text-xs text-slate-400">
          Paid{" "}
          {formatCurrency(
            getPaidAmount(booking)
          )}
        </p>
      </td>

      <td className="px-5 py-4">
        <span
          className={`
            inline-flex rounded-full px-2.5 py-1
            text-[10px] font-bold
            ${
              paymentStatus === "PAID"
                ? "bg-emerald-100 text-emerald-700"
                : paymentStatus ===
                  "PARTIAL"
                ? "bg-amber-100 text-amber-700"
                : paymentStatus ===
                  "REFUNDED"
                ? "bg-purple-100 text-purple-700"
                : "bg-red-100 text-red-700"
            }
          `}
        >
          {paymentStatus}
        </span>
      </td>

      <td className="px-5 py-4">
        <span
          className={`
            inline-flex rounded-full px-2.5 py-1
            text-[10px] font-bold
            ${
              status === "CONFIRMED"
                ? "bg-emerald-100 text-emerald-700"
                : status === "PENDING"
                ? "bg-amber-100 text-amber-700"
                : status === "COMPLETED"
                ? "bg-blue-100 text-blue-700"
                : status === "CANCELLED"
                ? "bg-red-100 text-red-700"
                : "bg-slate-100 text-slate-600"
            }
          `}
        >
          {status}
        </span>
      </td>
    </tr>
  );
}

/* =========================================================
   CRM ITEM
========================================================= */

function CRMItem({
  icon,
  title,
  value,
  description,
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-slate-100 p-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100">
        {icon}
      </div>

      <div className="flex-1">
        <p className="text-sm font-semibold">
          {title}
        </p>

        <p className="text-xs text-slate-400">
          {description}
        </p>
      </div>

      <span className="rounded-lg bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-indigo-600">
        {value}
      </span>
    </div>
  );
}

/* =========================================================
   BUSINESS SUMMARY
========================================================= */

function BusinessSummary({
  label,
  value,
}) {
  return (
    <div>
      <p className="text-xs uppercase tracking-wider text-slate-400">
        {label}
      </p>

      <p className="mt-2 text-2xl font-bold">
        {value}
      </p>
    </div>
  );
}

/* =========================================================
   QUICK ACTION
========================================================= */

function QuickAction({
  icon,
  label,
}) {
  return (
    <button className="group rounded-2xl border border-slate-200 bg-white p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-md">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 transition group-hover:bg-indigo-600 group-hover:text-white">
        {icon}
      </div>

      <p className="mt-3 text-sm font-semibold text-slate-800">
        {label}
      </p>

      <p className="mt-1 text-[11px] text-slate-400">
        Open
      </p>
    </button>
  );
}

/* =========================================================
   EMPTY STATE
========================================================= */

function EmptyState({ text }) {
  return (
    <div className="flex min-h-[120px] items-center justify-center p-6 text-center">
      <div>
        <div className="text-2xl text-slate-300">
          ◌
        </div>

        <p className="mt-2 text-sm text-slate-400">
          {text}
        </p>
      </div>
    </div>
  );
}