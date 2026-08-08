export default function BillingPage() {
  return (
    <div className="max-w-4xl space-y-8">
      <div className="animate-fade-in-up [animation-delay:100ms] opacity-0">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Billing & Plans</h1>
        <p className="text-gray-500 mt-2">Manage your subscription and billing details.</p>
      </div>

      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white shadow-lg animate-fade-in-up [animation-delay:200ms] opacity-0">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h3 className="text-sm font-semibold text-blue-100 mb-1">Current Plan</h3>
            <p className="text-3xl font-bold">Pro Student</p>
            <p className="text-blue-100 mt-2">Your next billing date is Oct 1, 2026.</p>
          </div>
          <button className="px-6 py-2.5 bg-white text-blue-600 rounded-lg text-sm font-bold shadow-sm hover:bg-gray-50 transition-colors">
            Manage Subscription
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden animate-fade-in-up [animation-delay:300ms] opacity-0">
        <div className="p-6 md:p-8 border-b border-gray-100">
          <h3 className="text-lg font-bold text-gray-900">Billing History</h3>
          <p className="text-sm text-gray-500 mt-1">View your recent invoices.</p>
        </div>
        
        <table className="w-full text-left text-sm text-gray-600">
          <thead className="bg-gray-50 text-gray-500 font-medium border-b border-gray-100">
            <tr>
              <th className="px-6 md:px-8 py-3">Date</th>
              <th className="px-6 md:px-8 py-3">Amount</th>
              <th className="px-6 md:px-8 py-3">Status</th>
              <th className="px-6 md:px-8 py-3 text-right">Invoice</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {[1, 2, 3].map((i) => (
              <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-6 md:px-8 py-4 whitespace-nowrap">Sep 1, 2026</td>
                <td className="px-6 md:px-8 py-4 whitespace-nowrap">$4.99</td>
                <td className="px-6 md:px-8 py-4 whitespace-nowrap">
                  <span className="px-2.5 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold">
                    Paid
                  </span>
                </td>
                <td className="px-6 md:px-8 py-4 whitespace-nowrap text-right">
                  <button className="text-blue-600 hover:text-blue-700 font-medium">Download</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
