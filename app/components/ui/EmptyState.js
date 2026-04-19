"use client";

export default function EmptyState({ icon: Icon, title, subtitle, action }) {
  return (
    <div className="py-20 text-center">
      {Icon && (
        <div className="w-16 h-16 rounded-full bg-colordark/5 flex items-center justify-center mx-auto mb-4">
          <Icon className="w-8 h-8 text-colordark/30" strokeWidth={1.5} />
        </div>
      )}
      <p className="text-[0.9375rem] text-colordark/50 font-medium mb-1">{title}</p>
      {subtitle && <p className="text-[0.8125rem] text-colordark/35 mb-4">{subtitle}</p>}
      {action && (
        <button
          onClick={action.onClick}
          className="px-5 h-10 text-[0.875rem] font-medium text-colordark bg-colorlight border border-colordark/8 hover:border-colordark/20 rounded-lg transition-all cursor-pointer"
        >
          {action.label}
        </button>
      )}
    </div>
  );
}
