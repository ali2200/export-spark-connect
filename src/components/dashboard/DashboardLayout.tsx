
import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { DashboardSidebar } from "./DashboardSidebar";
import { DashboardHeader } from "./DashboardHeader";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Toaster } from "@/components/ui/toaster";
import { useIsMobile } from "@/hooks/use-mobile";

export function DashboardLayout() {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const isMobile = useIsMobile();

  // Close sidebar when switching from mobile to desktop view
  useEffect(() => {
    if (!isMobile) {
      setIsMobileSidebarOpen(false);
    }
  }, [isMobile]);

  return (
    <div className="flex h-screen w-full flex-col md:flex-row">
      {/* Mobile sidebar */}
      <Sheet open={isMobileSidebarOpen} onOpenChange={setIsMobileSidebarOpen}>
        <SheetContent side="left" className="w-72 p-0 max-w-full">
          <DashboardSidebar isMobile={true} onClose={() => setIsMobileSidebarOpen(false)} />
        </SheetContent>
      </Sheet>

      {/* Desktop sidebar */}
      <div className="hidden md:flex md:w-64 md:flex-col">
        <DashboardSidebar />
      </div>

      {/* Main content */}
      <div className="flex flex-1 flex-col">
        <DashboardHeader onMenuClick={() => setIsMobileSidebarOpen(true)} />
        <main className="flex-1 overflow-auto p-3 md:p-6">
          <Outlet />
        </main>
      </div>
      <Toaster />
    </div>
  );
}
