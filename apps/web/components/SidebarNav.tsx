"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const Logo = () => (
  <svg width="24" height="24" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="10" y="55" width="35" height="35" rx="12" fill="#FF7043" />
    <rect x="32" y="32" width="36" height="36" rx="12" fill="#26A69A" />
    <rect x="55" y="10" width="35" height="35" rx="12" fill="#5C6BC0" />
  </svg>
);

const links = [
  { 
    name: "Overview", 
    href: "/dashboard", 
    icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
      </svg>
    ) 
  },
  { 
    name: "CGPA Calculator", 
    href: "/tools/calculators/cgpa", 
    icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M4 4h16a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2z" />
      </svg>
    ) 
  },
  { 
    name: "Bunk Tracker", 
    href: "/tools/calculators/attendance", 
    icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ) 
  },
  { 
    name: "OCR Extractor", 
    href: "/tools/ocr", 
    icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
      </svg>
    ) 
  },
  { 
    name: "Flashcards Deck", 
    href: "/flashcards", 
    icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ) 
  },
  { 
    name: "Admin Console", 
    href: "/admin", 
    icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ) 
  },
  { 
    name: "Profile Settings", 
    href: "/dashboard/profile", 
    icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ) 
  },
  { 
    name: "Billing & Plans", 
    href: "/dashboard/billing", 
    icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
      </svg>
    ) 
  },
];

export function SidebarNav() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Header */}
      <div className="md:hidden sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200/50 h-16 flex items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <button onClick={() => setIsOpen(true)} className="p-2 -ml-2 text-gray-500 hover:text-gray-900 focus:outline-none transition-colors">
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <Link href="/" className="flex items-center gap-2">
            <Logo />
            <span className="font-bold text-gray-900 tracking-tight">Stack.</span>
          </Link>
        </div>
      </div>

      {/* Mobile Slide-out Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity" onClick={() => setIsOpen(false)}></div>
          <div className="relative w-[280px] max-w-sm bg-white h-full flex flex-col shadow-2xl animate-fade-in-right">
            <div className="h-16 flex items-center justify-between px-6 border-b border-gray-100">
              <Link href="/" className="flex items-center gap-2" onClick={() => setIsOpen(false)}>
                <Logo />
                <span className="font-bold text-gray-900 tracking-tight">Stack.</span>
              </Link>
              <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-gray-900 transition-colors p-1 bg-gray-50 hover:bg-gray-100 rounded-full">
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
              </button>
            </div>
            <nav className="p-4 space-y-1.5 flex-1 overflow-y-auto">
              <div className="px-3 mb-2">
                <p className="text-xs font-semibold text-gray-400 tracking-wider uppercase">Menu</p>
              </div>
              {links.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`group flex items-center gap-3 px-3 py-2.5 rounded-xl text-[14px] font-medium transition-all duration-200 ${
                      isActive 
                        ? "bg-[#F2F2F7] text-[#1D1D1F]" 
                        : "text-[#1D1D1F]/60 hover:bg-[#F2F2F7]/50 hover:text-[#1D1D1F]"
                    }`}
                  >
                    <span className={`${isActive ? "text-[#1D1D1F]" : "text-[#1D1D1F]/40 group-hover:text-[#1D1D1F]"} transition-colors`}>{link.icon}</span>
                    {link.name}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <aside className="w-[260px] bg-white/80 backdrop-blur-xl border-r border-gray-200/50 flex-shrink-0 h-full hidden md:flex flex-col relative z-20">
        <div className="h-[88px] flex items-center px-8 shrink-0">
          <Link href="/" className="flex items-center gap-2 transition-transform hover:scale-[1.02] active:scale-95 duration-200">
            <Logo />
            <span className="font-bold text-gray-900 tracking-tight text-xl">Stack.</span>
          </Link>
        </div>
        <div className="p-4 flex-1 flex flex-col overflow-y-auto">
          <nav className="space-y-1.5 flex-1 mt-2">
            {links.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`group flex items-center gap-3 px-4 py-3 rounded-xl text-[14px] font-medium transition-all duration-200 ${
                    isActive 
                      ? "bg-[#F2F2F7] text-[#1D1D1F] shadow-apple-sm" 
                      : "text-[#1D1D1F]/60 hover:bg-[#F2F2F7]/50 hover:text-[#1D1D1F]"
                  }`}
                >
                  <span className={`${isActive ? "text-[#1D1D1F]" : "text-[#1D1D1F]/40 group-hover:text-[#1D1D1F]"} transition-colors`}>
                    {link.icon}
                  </span>
                  {link.name}
                </Link>
              );
            })}
          </nav>
        </div>
      </aside>
    </>
  );
}
