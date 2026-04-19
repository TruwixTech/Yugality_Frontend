export default function SettingsTab() {
  return (
    <div className="max-w-2xl space-y-5">
      <div className="p-6 rounded-2xl border border-colordark/6">
        <h3 className="text-[0.9375rem] font-semibold text-colordark mb-5">General Settings</h3>
        <div className="space-y-4">
          {[
            { label: "Site Name", value: "Yugality", type: "text" },
            { label: "Support Email", value: "support@yugality.com", type: "email" },
          ].map((f) => (
            <div key={f.label}>
              <label className="block text-[0.75rem] font-bold text-colordark/30 uppercase tracking-wider mb-2">
                {f.label}
              </label>
              <input
                type={f.type}
                defaultValue={f.value}
                className="w-full h-11 px-4 bg-colordark/1 border border-colordark/6 rounded-xl text-[0.875rem] text-colordark focus:outline-none focus:border-blue-from/30 transition-shadow focus:shadow-[0_0_0_1px_rgba(37,99,235,0.3)] shadow-sm"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="p-6 rounded-2xl border border-colordark/6">
        <h3 className="text-[0.9375rem] font-semibold text-colordark mb-5">Subscription Plans</h3>
        <div className="space-y-3">
          {[
            { name: "Free", price: "$0", features: "3 cases, Basic features" },
            { name: "Pro", price: "$29", features: "Unlimited cases, AI features" },
            { name: "Enterprise", price: "$99", features: "Everything + Priority support" },
          ].map((plan) => (
            <div
              key={plan.name}
              className="flex items-center justify-between p-5 bg-colordark/1 border border-colordark/6 rounded-xl"
            >
              <div>
                <p className="text-[0.875rem] font-semibold text-colordark">{plan.name}</p>
                <p className="text-[0.75rem] text-colordark/45 mt-0.5">{plan.features}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[0.875rem] font-semibold text-colordark">{plan.price}/mo</span>
                <button className="px-3 h-8 text-[0.75rem] font-semibold text-colordark bg-colorwhite border border-colordark/8 hover:border-colordark/20 rounded-lg transition-all cursor-pointer">
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end">
        <button className="px-6 h-10 text-[0.875rem] font-semibold text-white bg-linear-to-br from-blue-from to-blue-to hover:shadow-lg rounded-xl transition-all cursor-pointer">
          Save Changes
        </button>
      </div>
    </div>
  );
}
