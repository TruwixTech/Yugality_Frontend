import { Search } from "lucide-react";

export default function SearchBar({ value, onChange, placeholder = "Search..." }) {
  return (
    <div className="relative max-w-sm mb-6">
      <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-colordark/35" size={15} strokeWidth={2.5} />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full h-11 pl-10 pr-4 bg-colordark/1 border border-colordark/6 rounded-xl text-[0.8125rem] text-colordark placeholder:text-colordark/35 focus:outline-none focus:border-blue-from/40 focus:shadow-[0_0_0_3px_rgba(59,130,246,0.08)] transition-all"
      />
    </div>
  );
}
