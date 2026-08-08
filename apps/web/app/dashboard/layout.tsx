import { auth } from "@stack/auth";
import { ReactNode } from "react";
import { SidebarNav } from "../../components/SidebarNav";

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const session = await auth();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      <SidebarNav />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Top bar for Desktop */}
        <div className="hidden md:flex h-16 bg-white border-b border-gray-200 items-center justify-end px-8 sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-gray-600">{session?.user?.email || "User Account"}</span>
            <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs">
              {(session?.user?.email?.[0] || "U").toUpperCase()}
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div className="p-4 md:p-8 w-full max-w-[1600px] mx-auto overflow-y-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
