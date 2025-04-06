
import { useIsMobile } from "@/hooks/use-mobile";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { Toaster } from "@/components/ui/toaster";
import { Outlet } from "react-router-dom";

export function Layout() {
  const isMobile = useIsMobile();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 pt-16 md:pt-20">
        <div className={`container mx-auto ${isMobile ? 'px-3' : 'px-6'}`}>
          <Outlet />
        </div>
      </main>
      <Footer />
      <Toaster />
    </div>
  );
}
