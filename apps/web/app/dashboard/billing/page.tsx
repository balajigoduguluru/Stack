"use client";
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function BillingPage() {
  const { data: user, isLoading } = useSWR('http://localhost:8000/users/me', fetcher);

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto pb-12 animate-fade-in-up">
         <div className="h-[200px] flex items-center justify-center">
            <div className="animate-spin w-8 h-8 border-4 border-[#26A69A] border-t-transparent rounded-full"></div>
         </div>
      </div>
    );
  }

  const subscription = user?.subscription || { tier: 'free', aiCreditsUsed: 0, aiCreditsLimit: 100 };
  const percentUsed = Math.min(100, Math.round((subscription.aiCreditsUsed / subscription.aiCreditsLimit) * 100));

  return (
    <div className="max-w-4xl mx-auto pb-12 animate-fade-in-up">
      <header className="mb-10">
        <h1 className="text-[32px] font-bold text-[#1D1D1F] tracking-tight mb-2">Billing & Plans</h1>
        <p className="text-[#1D1D1F]/60 font-medium text-[16px]">Manage your subscription, usage, and billing history.</p>
      </header>

      {/* Current Plan & Usage */}
      <section className="mb-12">
        <div className="bg-white rounded-3xl p-8 shadow-apple-sm border border-gray-100 flex flex-col md:flex-row justify-between gap-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F2F2F7] mb-4">
              <span className="w-2 h-2 rounded-full bg-[#5C6BC0]"></span>
              <span className="text-[13px] font-medium text-[#1D1D1F]">Current Plan</span>
            </div>
            <h2 className="text-[28px] font-bold text-[#1D1D1F] tracking-tight mb-1 capitalize">{subscription.tier} Tier</h2>
            <p className="text-[#1D1D1F]/60 text-[15px]">{subscription.tier === 'pro' ? '$12 / month' : '$0 / month'}</p>
          </div>
          
          <div className="w-full md:w-[400px]">
            <div className="flex justify-between items-end mb-2">
              <span className="text-[14px] font-medium text-[#1D1D1F]">AI Flashcard Generations</span>
              <span className="text-[14px] font-medium text-[#1D1D1F]/60">{subscription.aiCreditsUsed} / {subscription.aiCreditsLimit}</span>
            </div>
            <div className="w-full h-2 bg-[#F2F2F7] rounded-full overflow-hidden">
              <div className="h-full bg-[#5C6BC0] rounded-full transition-all duration-1000" style={{ width: `${percentUsed}%` }}></div>
            </div>
            <p className="text-[13px] text-[#1D1D1F]/50 mt-3 text-right">Resets in 12 days</p>
          </div>
        </div>
      </section>

      {/* Upgrade Options */}
      <section className="mb-12">
        <h3 className="text-[20px] font-bold text-[#1D1D1F] tracking-tight mb-6">Available Plans</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Free Card */}
          <div className="bg-[#F5F5F7] rounded-3xl p-8 border border-transparent">
            <h4 className="text-[22px] font-bold text-[#1D1D1F] mb-2">Free</h4>
            <div className="text-[32px] font-bold text-[#1D1D1F] mb-6">$0<span className="text-[16px] text-[#1D1D1F]/50 font-medium">/mo</span></div>
            <ul className="space-y-4 mb-8">
              <li className="flex items-center gap-3 text-[15px] text-[#1D1D1F]/70">
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-[#1D1D1F]/40"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/></svg>
                Up to 100 AI Flashcards
              </li>
              <li className="flex items-center gap-3 text-[15px] text-[#1D1D1F]/70">
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-[#1D1D1F]/40"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/></svg>
                Basic note organization
              </li>
            </ul>
            <button className={`w-full py-3 rounded-xl border font-medium text-[15px] ${subscription.tier === 'free' ? 'bg-white text-[#1D1D1F] border-gray-200 opacity-50 cursor-not-allowed' : 'bg-white text-[#1D1D1F] border-gray-200 hover:bg-gray-50 transition-colors'}`}>
              {subscription.tier === 'free' ? 'Current Plan' : 'Downgrade to Free'}
            </button>
          </div>

          {/* Pro Card */}
          <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-apple-md relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#5C6BC0]/10 to-[#26A69A]/10 rounded-bl-[100px] -z-10"></div>
            {subscription.tier !== 'pro' && (
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-[#5C6BC0] to-[#26A69A] mb-4">
                <span className="text-[12px] font-bold text-white tracking-wide uppercase">Recommended</span>
              </div>
            )}
            <h4 className="text-[22px] font-bold text-[#1D1D1F] mb-2">Pro</h4>
            <div className="text-[32px] font-bold text-[#1D1D1F] mb-6">$12<span className="text-[16px] text-[#1D1D1F]/50 font-medium">/mo</span></div>
            <ul className="space-y-4 mb-8">
              <li className="flex items-center gap-3 text-[15px] text-[#1D1D1F]/70">
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-[#26A69A]"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/></svg>
                Unlimited AI Flashcards
              </li>
              <li className="flex items-center gap-3 text-[15px] text-[#1D1D1F]/70">
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-[#26A69A]"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/></svg>
                Advanced PDF parsing
              </li>
              <li className="flex items-center gap-3 text-[15px] text-[#1D1D1F]/70">
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-[#26A69A]"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/></svg>
                Priority support
              </li>
            </ul>
            <button className={`w-full py-3 rounded-xl font-medium text-[15px] transition-colors shadow-apple-sm ${subscription.tier === 'pro' ? 'bg-[#F2F2F7] text-[#1D1D1F]/50 cursor-not-allowed' : 'bg-[#1D1D1F] hover:bg-black text-white'}`}>
              {subscription.tier === 'pro' ? 'Current Plan' : 'Upgrade to Pro'}
            </button>
          </div>
        </div>
      </section>

      {/* Payment History */}
      <section>
        <h3 className="text-[20px] font-bold text-[#1D1D1F] tracking-tight mb-6">Payment History</h3>
        <div className="bg-white rounded-3xl shadow-apple-sm border border-gray-100 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100 bg-[#FAFAFA]">
                <th className="py-4 px-6 text-[13px] font-semibold text-[#1D1D1F]/60">Date</th>
                <th className="py-4 px-6 text-[13px] font-semibold text-[#1D1D1F]/60">Amount</th>
                <th className="py-4 px-6 text-[13px] font-semibold text-[#1D1D1F]/60">Status</th>
                <th className="py-4 px-6 text-[13px] font-semibold text-[#1D1D1F]/60 text-right">Invoice</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={4} className="py-12 px-6 text-center text-[#1D1D1F]/50 text-[14px]">
                  No payment history available.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

