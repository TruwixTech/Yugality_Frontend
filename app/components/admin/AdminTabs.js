export default function AdminTabs({ tabs, activeTab, setActiveTab }) {
  return (
    <div className="flex items-center gap-1 mb-8 border-b border-colordark/6">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-6 py-3.5 text-[0.8125rem] font-semibold border-b-2 transition-all cursor-pointer -mb-px ${
              isActive
                ? "border-blue-from text-blue-from"
                : "border-transparent text-colordark/35 hover:text-colordark/60"
            }`}
          >
            <Icon size={16} strokeWidth={2.5} />
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
