export default function StatCard({ label, value, highlight = false }) {
  return (
    <div className={`px-5 py-4 rounded-2xl border ${highlight ? "bg-colordark border-colordark" : "border-colordark/6"}`}>
      <p className={`text-[0.6875rem] font-bold uppercase tracking-wider mb-2 ${highlight ? "text-colorlight/50" : "text-colordark/30"}`}>
        {label}
      </p>
      <p className={`text-[1.75rem] font-semibold tracking-tight leading-none ${highlight ? "text-colorlight" : "text-colordark"}`}>
        {value}
      </p>
    </div>
  );
}
