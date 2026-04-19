"use client";

export default function ResearchTabs({ activeTab, setActiveTab }) {
  const tabs = [
    { id: "results", label: "Search Results" },
    { id: "databases", label: "Databases" },
    { id: "saved", label: "Saved Research" },
    { id: "news", label: "Latest Legal News" },
  ];

  return (
    <div className="border-b border-colordark/[0.06] mb-6">
      <div className="flex items-center gap-0">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-3 text-[0.875rem] font-medium border-b-2 transition-all cursor-pointer ${
              activeTab === tab.id
                ? "text-transparent bg-clip-text bg-gradient-to-r from-blue-from to-blue-to border-blue-from"
                : "text-colordark/45 border-transparent hover:text-colordark/70 hover:border-colordark/15"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}
