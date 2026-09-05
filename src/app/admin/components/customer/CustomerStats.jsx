import StatCard from "./StatCard";

export default function CustomerStats({ stats }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <StatCard
        title="Total Customers"
        value={stats.totalCustomers}
        icon="👥"
      />

      <StatCard
        title="Active Customers"
        value={stats.activeCustomers}
        icon="✓"
      />

      <StatCard
        title="New Customers"
        value={stats.newCustomers}
        icon="✨"
      />

      <StatCard
        title="Total Bookings"
        value={stats.totalBookings}
        icon="📅"
      />
    </div>
  );
}