import { CheckCircle, XCircle, MoreVertical } from "lucide-react";

const planBadge = (plan) => {
  if (plan === "Enterprise") return "bg-purple-50 text-purple-600";
  if (plan === "Pro") return "bg-blue-50 text-blue-600";
  return "bg-colorlight text-colordark/55";
};

export default function SubscriptionsTable({ subscriptions }) {
  return (
    <div className="overflow-x-auto -mx-5 px-5 md:mx-0 md:px-0">
      <div className="rounded-2xl border border-colordark/6 overflow-hidden mb-12 min-w-[900px]">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-colordark/6">
              {["User", "Plan", "Amount", "Status", "Next Billing", "Method", ""].map((h, i) => (
                <th
                  key={i}
                  className={`px-6 py-4 text-[0.8125rem] font-semibold text-colordark/50 uppercase tracking-wider ${
                    i === 6 ? "text-right" : "text-left"
                  }`}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-colordark/4">
            {subscriptions.map((sub) => (
              <tr key={sub.id} className="hover:bg-colordark/1.5 transition-colors cursor-pointer group">
                <td className="px-6 py-4">
                  <p className="text-[0.875rem] font-semibold text-colordark group-hover:text-blue-from transition-colors">
                    {sub.user}
                  </p>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex px-2.5 py-1 rounded-full text-[0.6875rem] font-bold uppercase tracking-wide ${planBadge(sub.plan)}`}>
                    {sub.plan}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-[0.875rem] font-semibold text-colordark">{sub.amount}</span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-1.5">
                    {sub.status === "Active" ? (
                      <>
                        <CheckCircle size={13} className="text-green-500" strokeWidth={2} />
                        <span className="text-[0.8125rem] text-green-600 font-medium">Active</span>
                      </>
                    ) : (
                      <>
                        <XCircle size={13} className="text-red-400" strokeWidth={2} />
                        <span className="text-[0.8125rem] text-red-500 font-medium">Cancelled</span>
                      </>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-[0.8125rem] text-colordark/45 font-medium">{sub.nextBilling}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-[0.8125rem] text-colordark/45 font-medium">{sub.method}</span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="p-1.5 text-colordark/30 hover:text-colordark hover:bg-colordark/5 rounded-lg transition-all cursor-pointer">
                    <MoreVertical size={16} strokeWidth={2} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
