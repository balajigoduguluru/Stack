"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const Logo = () => (
  <svg width="24" height="24" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="10" y="55" width="35" height="35" rx="12" fill="#FF8A65" />
    <rect x="32" y="32" width="36" height="36" rx="12" fill="#26A69A" />
    <rect x="55" y="10" width="35" height="35" rx="12" fill="#5C6BC0" />
  </svg>
);

const links = [
  { name: "Overview", href: "/dashboard", icon: "📊" },
  { name: "Profile Settings", href: "/dashboard/profile", icon: "👤" },
  { name: "Billing & Plans", href: "/dashboard/billing", icon: "💳" },
];

export function SidebarNav() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Header (replaces the one in layout) */}
      <div className="md:hidden sticky top-0 z-50 bg-white border-b border-gray-200 h-16 flex items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <button onClick={() => setIsOpen(true)} className="p-2 -ml-2 text-gray-500 hover:text-gray-900 focus:outline-none">
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
          <div className="fixed inset-0 bg-black/20 backdrop-blur-sm" onClick={() => setIsOpen(false)}></div>
          <div className="relative w-64 max-w-sm bg-white h-full flex flex-col shadow-xl animate-fade-in-right">
            <div className="h-16 flex items-center justify-between px-6 border-b border-gray-100">
              <Link href="/" className="flex items-center gap-2" onClick={() => setIsOpen(false)}>
                <Logo />
                <span className="font-bold text-gray-900 tracking-tight">Stack.</span>
              </Link>
              <button onClick={() => setIsOpen(false)} className="text-gray-500 p-1">
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
              </button>
            </div>
            <nav className="p-4 space-y-1 flex-1">
              {links.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive ? "bg-gray-100 text-gray-900" : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                    }`}
                  >
                    <span>{link.icon}</span>
                    {link.name}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex-shrink-0 sticky top-0 h-screen z-10 hidden md:flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-gray-100">
          <Link href="/" className="flex items-center gap-2">
            <Logo />
            <span className="font-bold text-gray-900 tracking-tight">Stack.</span>
          </Link>
        </div>
        <nav className="p-4 space-y-1 flex-1">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive ? "bg-gray-100 text-gray-900" : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                <span>{link.icon}</span>
                {link.name}
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
