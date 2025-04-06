
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { DashboardSidebar } from "./DashboardSidebar";
import { DashboardHeader } from "./DashboardHeader";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Toaster } from "@/components/ui/toaster";

export function DashboardLayout() {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen w-full flex-col md:flex-row">
      {/* Mobile sidebar */}
      <Sheet open={isMobileSidebarOpen} onOpenChange={setIsMobileSidebarOpen}>
        <SheetContent side="left" className="w-64 p-0">
          <DashboardSidebar />
        </SheetContent>
      </Sheet>

      {/* Desktop sidebar */}
      <div className="hidden md:flex md:w-64 md:flex-col">
        <DashboardSidebar />
      </div>

      {/* Main content */}
      <div className="flex flex-1 flex-col">
        <DashboardHeader onMenuClick={() => setIsMobileSidebarOpen(true)} />
        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
      </div>
      <Toaster />
    </div>
  );
}
