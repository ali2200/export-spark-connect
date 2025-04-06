
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAuth } from "@/context/AuthContext";
import {
  BarChart3,
  Box,
  Building2,
  Factory,
  FileText,
  HandshakeIcon,
  Home,
  LogOut,
  Mail,
  Package,
  Settings,
  ShoppingBag,
  Star,
  UserPlus,
  Users,
} from "lucide-react";

interface NavItemProps {
  href: string;
  icon: React.ElementType;
  label: string;
}

function NavItem({ href, icon: Icon, label }: NavItemProps) {
  const { pathname } = useLocation();
  const isActive = pathname === href;

  return (
    <Link
      to={href}
      className={cn(
        "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
        isActive
          ? "bg-export-blue-100 text-export-blue-600 font-medium"
          : "text-gray-600 hover:bg-export-blue-50 hover:text-export-blue-600"
      )}
    >
      <Icon className="h-4 w-4" />
      {label}
    </Link>
  );
}

export function DashboardSidebar() {
  const { user, logout } = useAuth();
  
  const factoryNavItems = [
    { href: "/dashboard", icon: Home, label: "Overview" },
    { href: "/dashboard/products", icon: Package, label: "Products" },
    { href: "/dashboard/leads", icon: UserPlus, label: "Leads" },
    { href: "/dashboard/marketers", icon: Users, label: "Marketers" },
    { href: "/dashboard/profile", icon: Building2, label: "Company Profile" },
    { href: "/dashboard/analytics", icon: BarChart3, label: "Analytics" },
    { href: "/dashboard/settings", icon: Settings, label: "Settings" },
  ];

  const marketerNavItems = [
    { href: "/dashboard", icon: Home, label: "Overview" },
    { href: "/dashboard/products", icon: Package, label: "Browse Products" },
    { href: "/dashboard/campaigns", icon: ShoppingBag, label: "My Campaigns" },
    { href: "/dashboard/leads", icon: UserPlus, label: "My Leads" },
    { href: "/dashboard/training", icon: Star, label: "Training" },
    { href: "/dashboard/analytics", icon: BarChart3, label: "Performance" },
    { href: "/dashboard/settings", icon: Settings, label: "Settings" },
  ];

  const adminNavItems = [
    { href: "/dashboard", icon: Home, label: "Overview" },
    { href: "/dashboard/factories", icon: Factory, label: "Factories" },
    { href: "/dashboard/marketers", icon: Users, label: "Marketers" },
    { href: "/dashboard/products", icon: Box, label: "Products" },
    { href: "/dashboard/leads", icon: HandshakeIcon, label: "Deals" },
    { href: "/dashboard/content", icon: FileText, label: "Content" },
    { href: "/dashboard/messages", icon: Mail, label: "Messages" },
    { href: "/dashboard/settings", icon: Settings, label: "Settings" },
  ];

  let navItems: Array<{ href: string; icon: React.ElementType; label: string }> = [];

  switch (user?.role) {
    case "factory":
      navItems = factoryNavItems;
      break;
    case "marketer":
      navItems = marketerNavItems;
      break;
    case "admin":
      navItems = adminNavItems;
      break;
    default:
      navItems = marketerNavItems;
  }

  return (
    <div className="flex h-full flex-col border-r bg-sidebar">
      <div className="p-4">
        <div className="flex h-12 items-center justify-center rounded-md bg-export-blue-600 px-2">
          <Link to="/" className="flex items-center gap-2">
            <span className="font-heading text-xl font-bold text-white">Export Base</span>
          </Link>
        </div>
      </div>
      <ScrollArea className="flex-1 px-3 py-2">
        <div className="space-y-1">
          {navItems.map((item, index) => (
            <NavItem
              key={index}
              href={item.href}
              icon={item.icon}
              label={item.label}
            />
          ))}
        </div>
      </ScrollArea>
      <div className="mt-auto p-4">
        <Button
          variant="outline"
          className="w-full justify-start"
          onClick={logout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Log out
        </Button>
      </div>
    </div>
  );
}
