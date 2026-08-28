import { auth } from "@stack/auth";
import Link from "next/link";

const Logo = () => (
  <svg width="32" height="32" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="10" y="55" width="35" height="35" rx="12" fill="#FF7043" />
    <rect x="32" y="32" width="36" height="36" rx="12" fill="#26A69A" />
    <rect x="55" y="10" width="35" height="35" rx="12" fill="#5C6BC0" />
  </svg>
);

export default async function Home() {
  const session = await auth();

  return (
    <div className="min-h-screen bg-[#F5F5F7] flex flex-col items-center selection:bg-[#5C6BC0]/20 selection:text-[#5C6BC0]">
      {/* Floating Apple-Style Navbar */}
      <div className="w-full flex justify-center sticky top-4 z-50 px-4">
        <header className="w-full max-w-5xl bg-white/70 backdrop-blur-xl border border-white/40 shadow-apple-sm rounded-full h-16 flex items-center justify-between px-6">
          <div className="flex items-center gap-3 transition-transform hover:scale-105 duration-300">
            <Logo />
            <span className="text-xl font-bold text-[#1D1D1F] tracking-tighter">Stack.</span>
          </div>
          
          <nav className="hidden md:flex gap-8 text-[14px] font-medium text-[#1D1D1F]/70">
            <Link href="#features" className="hover:text-[#1D1D1F] transition-colors duration-300">Features</Link>
            <Link href="/docs" className="hover:text-[#1D1D1F] transition-colors duration-300">Docs</Link>
            <Link href="/pricing" className="hover:text-[#1D1D1F] transition-colors duration-300">Pricing</Link>
          </nav>

          <div className="flex items-center gap-4">
            {session ? (
              <Link href="/dashboard" className="bg-[#1D1D1F] hover:bg-[#000000] text-white px-5 py-2 rounded-full text-[14px] font-medium transition-all active:scale-95 duration-200">
                Dashboard
              </Link>
            ) : (
              <button className="bg-[#1D1D1F] hover:bg-[#000000] text-white px-5 py-2 rounded-full text-[14px] font-medium transition-all active:scale-95 duration-200">
                Get Started
              </button>
            )}
          </div>
        </header>
      </div>

      {/* Hero Section */}
      <main className="w-full max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24 flex flex-col items-center text-center">
        <div className="animate-fade-in-up [animation-delay:100ms] opacity-0 flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-gray-200 shadow-apple-sm mb-8">
            <span className="flex h-2 w-2 rounded-full bg-[#26A69A]"></span>
            <span className="text-xs font-medium text-gray-600">Stack AI 2.0 is now live</span>
          </div>
          <h1 className="text-[56px] md:text-[88px] font-bold text-[#1D1D1F] leading-[1.05] tracking-tight mb-6 max-w-4xl">
            Knowledge, <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5C6BC0] via-[#26A69A] to-[#FF7043]">
              beautifully structured.
            </span>
          </h1>
        </div>
        
        <div className="animate-fade-in-up [animation-delay:200ms] opacity-0">
          <p className="text-[20px] md:text-[24px] text-[#1D1D1F]/60 mb-12 max-w-2xl font-medium tracking-tight leading-snug">
            The enterprise-grade workspace for students and researchers. AI-powered flashcards, intelligent notes, and seamless organization.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up [animation-delay:300ms] opacity-0 w-full sm:w-auto">
          <Link href="/dashboard" className="bg-[#5C6BC0] hover:bg-[#4A59A7] text-white px-8 py-4 rounded-full text-[16px] font-medium transition-all shadow-apple-md active:scale-95 duration-200">
            Start for free
          </Link>
          <Link href="#features" className="bg-white hover:bg-gray-50 text-[#1D1D1F] px-8 py-4 rounded-full text-[16px] font-medium transition-all shadow-apple-sm active:scale-95 duration-200">
            See how it works
          </Link>
        </div>
      </main>

      {/* Mockup Presentation */}
      <section className="w-full max-w-[1200px] mx-auto px-4 mb-32 animate-fade-in-up [animation-delay:500ms] opacity-0">
        <div className="w-full aspect-[16/9] bg-white rounded-[40px] shadow-apple-lg border border-gray-100 overflow-hidden flex flex-col">
          {/* Fake Browser Chrome */}
          <div className="h-12 border-b border-gray-100 flex items-center px-6 gap-2 bg-[#FAFAFA]">
            <div className="w-3 h-3 rounded-full bg-gray-300"></div>
            <div className="w-3 h-3 rounded-full bg-gray-300"></div>
            <div className="w-3 h-3 rounded-full bg-gray-300"></div>
          </div>
          {/* Fake Dashboard Content */}
          <div className="flex-1 bg-[#F5F5F7] p-8 flex gap-8">
            <div className="w-64 bg-white rounded-3xl shadow-apple-sm p-6 hidden md:block">
              <div className="w-3/4 h-4 bg-gray-100 rounded-full mb-8"></div>
              <div className="w-full h-8 bg-gray-50 rounded-lg mb-3"></div>
              <div className="w-full h-8 bg-gray-50 rounded-lg mb-3"></div>
              <div className="w-full h-8 bg-gray-50 rounded-lg"></div>
            </div>
            <div className="flex-1 flex flex-col gap-6">
               <div className="w-1/3 h-8 bg-white rounded-xl shadow-apple-sm"></div>
               <div className="flex gap-6">
                 <div className="flex-1 h-32 bg-white rounded-3xl shadow-apple-sm p-6 flex flex-col justify-between">
                   <div className="w-10 h-10 bg-[#5C6BC0]/10 rounded-2xl"></div>
                   <div className="w-1/2 h-4 bg-gray-100 rounded-full"></div>
                 </div>
                 <div className="flex-1 h-32 bg-white rounded-3xl shadow-apple-sm p-6 flex flex-col justify-between">
                   <div className="w-10 h-10 bg-[#26A69A]/10 rounded-2xl"></div>
                   <div className="w-1/2 h-4 bg-gray-100 rounded-full"></div>
                 </div>
               </div>
               <div className="flex-1 bg-white rounded-3xl shadow-apple-sm"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-24 bg-white rounded-[48px] shadow-apple-md mb-24">
        <div className="mb-20 text-center max-w-2xl mx-auto">
          <h2 className="text-[40px] md:text-[56px] font-bold text-[#1D1D1F] tracking-tight mb-4 leading-tight">Everything you need. <br/>Nothing you don't.</h2>
          <p className="text-[#1D1D1F]/60 font-medium text-[20px]">A unified architecture for personal knowledge management.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-[#F5F5F7] p-10 rounded-[32px] transition-all hover:scale-[1.02] duration-300">
            <div className="w-14 h-14 bg-white shadow-apple-sm text-[#5C6BC0] rounded-[20px] flex items-center justify-center mb-8">
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 className="text-[22px] font-bold text-[#1D1D1F] mb-3 tracking-tight">AI-Powered Notes</h3>
            <p className="text-[#1D1D1F]/60 font-medium text-[16px] leading-relaxed">
              Drop in your text. The engine automatically summarizes and extracts key concepts.
            </p>
          </div>

          <div className="bg-[#F5F5F7] p-10 rounded-[32px] transition-all hover:scale-[1.02] duration-300">
            <div className="w-14 h-14 bg-white shadow-apple-sm text-[#26A69A] rounded-[20px] flex items-center justify-center mb-8">
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-[22px] font-bold text-[#1D1D1F] mb-3 tracking-tight">Smart Flashcards</h3>
            <p className="text-[#1D1D1F]/60 font-medium text-[16px] leading-relaxed">
              3D interactive flashcards generated instantly from your notes for active recall.
            </p>
          </div>

          <div className="bg-[#F5F5F7] p-10 rounded-[32px] transition-all hover:scale-[1.02] duration-300">
            <div className="w-14 h-14 bg-white shadow-apple-sm text-[#FF7043] rounded-[20px] flex items-center justify-center mb-8">
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-[22px] font-bold text-[#1D1D1F] mb-3 tracking-tight">Live Analytics</h3>
            <p className="text-[#1D1D1F]/60 font-medium text-[16px] leading-relaxed">
              Monitor your study velocity and task completion rates in real time.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full mt-auto bg-[#F5F5F7] py-16">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div className="sm:col-span-2 lg:col-span-1">
              <div className="flex items-center gap-3 mb-6">
                <Logo />
                <span className="text-xl font-bold text-[#1D1D1F] tracking-tighter">Stack.</span>
              </div>
              <p className="text-[#1D1D1F]/50 font-medium text-[14px]">
                Built for the modern mind.
              </p>
            </div>
            
            <div>
              <h4 className="text-[#1D1D1F] font-semibold mb-6 text-[14px]">Product</h4>
              <ul className="space-y-4 text-[14px] font-medium text-[#1D1D1F]/60">
                <li><Link href="#features" className="hover:text-[#1D1D1F] transition-colors">Features</Link></li>
                <li><Link href="/pricing" className="hover:text-[#1D1D1F] transition-colors">Pricing</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-[#1D1D1F] font-semibold mb-6 text-[14px]">Resources</h4>
              <ul className="space-y-4 text-[14px] font-medium text-[#1D1D1F]/60">
                <li><Link href="/docs" className="hover:text-[#1D1D1F] transition-colors">Documentation</Link></li>
                <li><Link href="#" className="hover:text-[#1D1D1F] transition-colors">Help Center</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-[#1D1D1F] font-semibold mb-6 text-[14px]">Legal</h4>
              <ul className="space-y-4 text-[14px] font-medium text-[#1D1D1F]/60">
                <li><Link href="#" className="hover:text-[#1D1D1F] transition-colors">Privacy</Link></li>
                <li><Link href="#" className="hover:text-[#1D1D1F] transition-colors">Terms</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row items-center justify-between gap-4 text-[13px] font-medium text-[#1D1D1F]/40">
            <p>&copy; {new Date().getFullYear()} Stack Inc. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
