import StatCard from "./StatCard";
import SearchBar from "./SearchBar";
import SubscriptionsTable from "./SubscriptionsTable";

export default function SubscriptionsTab({ subscriptions, searchQuery, setSearchQuery }) {
  const filteredSubscriptions = subscriptions.filter(
    (s) =>
      s.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.plan.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard label="Total Revenue" value="$45,231" />
        <StatCard label="Active Subs" value="892" highlight />
        <StatCard label="MRR" value="$28,450" />
        <StatCard label="Avg. Value" value="$31.90" />
      </div>

      <SearchBar value={searchQuery} onChange={setSearchQuery} placeholder="Search subscriptions..." />

      <SubscriptionsTable subscriptions={filteredSubscriptions} />
    </div>
  );
}
