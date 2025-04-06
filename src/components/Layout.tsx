
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { Toaster } from "@/components/ui/toaster";
import { Outlet } from "react-router-dom";

export function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <Toaster />
    </div>
  );
}
