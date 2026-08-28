import { auth } from "@stack/auth";
import { ReactNode } from "react";
import { SidebarNav } from "../../components/SidebarNav";
import { TopBarActions } from "../../components/TopBarActions";

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const session = await auth();

  return (
    <div className="min-h-screen bg-[#F5F5F7] relative flex items-center justify-center p-0 md:p-8 overflow-hidden">
      {/* Decorative ambient background (Monochrome) */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        {/* Soft abstract shapes */}
        <div className="absolute -top-[10%] -right-[5%] w-[60%] h-[60%] rounded-full bg-white/40 blur-[120px]"></div>
        <div className="absolute top-[40%] -left-[10%] w-[50%] h-[60%] rounded-full bg-black/5 blur-[120px]"></div>
        <div className="absolute top-[80%] right-[20%] w-[40%] h-[40%] rounded-full bg-white/30 blur-[100px]"></div>
      </div>

      {/* Main Glass App Container */}
      <div className="relative z-10 w-full h-full md:h-[calc(100vh-4rem)] max-w-[1600px] bg-white/60 backdrop-blur-3xl md:rounded-[40px] border border-white/60 shadow-apple-lg flex flex-col md:flex-row overflow-hidden">
        <SidebarNav />

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col min-w-0 h-full">
          {/* Top bar for Desktop */}
          <div className="hidden md:flex h-[88px] items-center justify-end px-10 shrink-0">
            <TopBarActions initialEmail={(session?.user?.email?.[0] || "U").toUpperCase()} />
          </div>

          {/* Page Content */}
          <div className="p-4 md:px-10 md:pb-10 w-full overflow-y-auto flex-1">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
