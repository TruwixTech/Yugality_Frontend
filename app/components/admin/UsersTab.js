import StatCard from "./StatCard";
import SearchBar from "./SearchBar";
import UsersTable from "./UsersTable";

export default function UsersTab({ users, searchQuery, setSearchQuery }) {
  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard label="Total Users" value="1,234" />
        <StatCard label="Active Users" value="1,089" highlight />
        <StatCard label="New This Month" value="145" />
        <StatCard label="Churn Rate" value="2.3%" />
      </div>

      <SearchBar value={searchQuery} onChange={setSearchQuery} placeholder="Search..." />

      <UsersTable users={filteredUsers} />
    </div>
  );
}
