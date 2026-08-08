import { auth } from "@stack/auth";
import Link from "next/link";

const Logo = () => (
  <svg width="32" height="32" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="10" y="55" width="35" height="35" rx="12" fill="#FF8A65" />
    <rect x="32" y="32" width="36" height="36" rx="12" fill="#26A69A" />
    <rect x="55" y="10" width="35" height="35" rx="12" fill="#5C6BC0" />
  </svg>
);

export default async function Home() {
  const session = await auth();

  return (
    <div className="min-h-screen bg-[#FBFBFD] flex flex-col items-center selection:bg-blue-100 selection:text-blue-900">
      {/* Navbar */}
      <header className="w-full bg-[#FBFBFD]/80 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-50">
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Logo />
            <span className="text-2xl font-bold text-gray-900 tracking-tighter">Stack.</span>
          </div>
          
          <nav className="hidden md:flex gap-8 text-[13px] font-medium text-gray-500">
            <Link href="#features" className="hover:text-gray-900 transition-colors duration-300">Features</Link>
            <Link href="/docs" className="hover:text-gray-900 transition-colors duration-300">Docs</Link>
            <Link href="#" className="hover:text-gray-900 transition-colors duration-300">Support</Link>
          </nav>

          <div className="flex items-center gap-4">
            {session ? (
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-600 hidden sm:inline-block font-medium">{session.user?.email}</span>
                <Link href="/dashboard" className="bg-black hover:bg-gray-800 text-white px-4 py-1.5 rounded-full text-[13px] font-medium transition-transform active:scale-95 duration-200">
                  Dashboard
                </Link>
              </div>
            ) : (
              <button className="bg-black hover:bg-gray-800 text-white px-5 py-1.5 rounded-full text-[13px] font-medium transition-transform active:scale-95 duration-200 shadow-sm">
                Get Started
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Hero */}
      <main className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 flex flex-col items-center text-center">
        <div className="animate-fade-in-up [animation-delay:100ms] opacity-0">
          <h1 className="text-[48px] sm:text-[56px] md:text-[72px] font-bold text-gray-900 leading-[1.05] tracking-[-0.03em] mb-6 max-w-4xl">
            Stack your knowledge. <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF8A65] via-[#26A69A] to-[#5C6BC0]">
              Build your future.
            </span>
          </h1>
        </div>
        
        <div className="animate-fade-in-up [animation-delay:200ms] opacity-0">
          <p className="text-[18px] sm:text-[20px] md:text-[24px] text-gray-500 mb-10 max-w-2xl font-medium tracking-tight leading-snug">
            The minimal workspace for students. Notes, schedule, and analytics.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up [animation-delay:300ms] opacity-0 w-full sm:w-auto">
          <Link href="/dashboard" className="bg-black hover:bg-gray-800 text-white px-8 py-3.5 rounded-full text-[15px] font-medium transition-all hover:-translate-y-0.5 shadow-md hover:shadow-lg active:scale-95 duration-200 flex items-center justify-center">
            Go to Workspace
          </Link>
          <Link href="#features" className="bg-white hover:bg-gray-50 text-gray-900 px-8 py-3.5 rounded-full text-[15px] font-medium transition-all hover:-translate-y-0.5 shadow-sm border border-gray-200/50 hover:shadow-md active:scale-95 duration-200 flex items-center justify-center">
            View Features
          </Link>
        </div>
      </main>

      {/* Features */}
      <section id="features" className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="mb-12 text-center animate-fade-in-up [animation-delay:350ms] opacity-0">
          <h2 className="text-3xl font-bold text-gray-900 tracking-tight mb-2">Everything you need.</h2>
          <p className="text-gray-500 font-medium text-lg">One minimal workspace.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          <div className="group bg-white p-6 sm:p-8 rounded-[24px] shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-gray-100 hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)] transition-all duration-500 hover:-translate-y-1 animate-fade-in-up [animation-delay:400ms] opacity-0">
            <div className="w-12 h-12 bg-[#F2F2F7] text-[#5C6BC0] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 className="text-[19px] font-semibold text-gray-900 mb-2 tracking-tight">Smart Notes</h3>
            <p className="text-gray-500 font-medium text-[15px] leading-relaxed">
              Write without distraction. AI summarizes automatically.
            </p>
          </div>

          <div className="group bg-white p-6 sm:p-8 rounded-[24px] shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-gray-100 hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)] transition-all duration-500 hover:-translate-y-1 animate-fade-in-up [animation-delay:450ms] opacity-0">
            <div className="w-12 h-12 bg-[#F2F2F7] text-[#26A69A] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-[19px] font-semibold text-gray-900 mb-2 tracking-tight">Schedule</h3>
            <p className="text-gray-500 font-medium text-[15px] leading-relaxed">
              Visual calendar. Never miss an assignment.
            </p>
          </div>

          <div className="group bg-white p-6 sm:p-8 rounded-[24px] shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-gray-100 hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)] transition-all duration-500 hover:-translate-y-1 animate-fade-in-up [animation-delay:500ms] opacity-0">
            <div className="w-12 h-12 bg-[#F2F2F7] text-[#FF8A65] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-[19px] font-semibold text-gray-900 mb-2 tracking-tight">Analytics</h3>
            <p className="text-gray-500 font-medium text-[15px] leading-relaxed">
              Track your study hours with beautiful charts.
            </p>
          </div>

          <div className="group bg-white p-6 sm:p-8 rounded-[24px] shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-gray-100 hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)] transition-all duration-500 hover:-translate-y-1 animate-fade-in-up [animation-delay:550ms] opacity-0">
            <div className="w-12 h-12 bg-[#F2F2F7] text-[#E91E63] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-[19px] font-semibold text-gray-900 mb-2 tracking-tight">AI PDF Reader</h3>
            <p className="text-gray-500 font-medium text-[15px] leading-relaxed">
              Generate flashcards and quizzes instantly.
            </p>
          </div>

          <div className="group bg-white p-6 sm:p-8 rounded-[24px] shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-gray-100 hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)] transition-all duration-500 hover:-translate-y-1 animate-fade-in-up [animation-delay:600ms] opacity-0">
            <div className="w-12 h-12 bg-[#F2F2F7] text-[#00BCD4] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-[19px] font-semibold text-gray-900 mb-2 tracking-tight">Pomodoro Timer</h3>
            <p className="text-gray-500 font-medium text-[15px] leading-relaxed">
              Stay focused with built-in study sessions.
            </p>
          </div>

          <div className="group bg-white p-6 sm:p-8 rounded-[24px] shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-gray-100 hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)] transition-all duration-500 hover:-translate-y-1 animate-fade-in-up [animation-delay:650ms] opacity-0">
            <div className="w-12 h-12 bg-[#F2F2F7] text-[#9C27B0] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-[19px] font-semibold text-gray-900 mb-2 tracking-tight">GPA Calculator</h3>
            <p className="text-gray-500 font-medium text-[15px] leading-relaxed">
              Project your semester grades accurately.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full mt-auto border-t border-gray-200/60 bg-white py-12 md:py-16 animate-fade-in [animation-delay:800ms] opacity-0">
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-12 mb-12 lg:mb-16">
            <div className="sm:col-span-2 lg:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <Logo />
                <span className="text-2xl font-bold text-gray-900 tracking-tighter">Stack.</span>
              </div>
              <p className="text-gray-500 font-medium text-[15px] max-w-sm leading-relaxed">
                The all-in-one minimal workspace designed to help students organize notes and track assignments.
              </p>
            </div>
            
            <div>
              <h4 className="text-gray-900 font-semibold mb-6">Product</h4>
              <ul className="space-y-4 text-[14px] font-medium text-gray-500">
                <li><Link href="#features" className="hover:text-blue-600 transition-colors">Features</Link></li>
                <li><Link href="#" className="hover:text-blue-600 transition-colors">Pricing</Link></li>
                <li><Link href="#" className="hover:text-blue-600 transition-colors">Integrations</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-gray-900 font-semibold mb-6">Resources</h4>
              <ul className="space-y-4 text-[14px] font-medium text-gray-500">
                <li><Link href="/docs" className="hover:text-blue-600 transition-colors">Documentation</Link></li>
                <li><Link href="#" className="hover:text-blue-600 transition-colors">Help Center</Link></li>
                <li><Link href="#" className="hover:text-blue-600 transition-colors">Community</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-gray-900 font-semibold mb-6">Company</h4>
              <ul className="space-y-4 text-[14px] font-medium text-gray-500">
                <li><Link href="#" className="hover:text-blue-600 transition-colors">About Us</Link></li>
                <li><Link href="#" className="hover:text-blue-600 transition-colors">Contact</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-4 text-[13px] font-medium text-gray-400">
            <p>&copy; {new Date().getFullYear()} Stack Inc. All rights reserved.</p>
            <div className="flex gap-4 sm:gap-6">
              <Link href="#" className="hover:text-gray-900 transition-colors">Privacy Policy</Link>
              <Link href="#" className="hover:text-gray-900 transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

