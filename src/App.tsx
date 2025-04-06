
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import { Layout } from "./components/Layout";
import { DashboardLayout } from "./components/dashboard/DashboardLayout";
import { ProtectedRoute } from "./components/ProtectedRoute";

import Index from "./pages/Index";
import Contact from "./pages/Contact";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import NotFound from "./pages/NotFound";
import Unauthorized from "./pages/Unauthorized";
import DashboardHome from "./pages/dashboard/DashboardHome";
import ProductManagement from "./pages/dashboard/products/ProductManagement";
import ProductBrowser from "./pages/dashboard/products/ProductBrowser";
import ProductDetails from "./pages/dashboard/products/ProductDetails";
import LeadManagement from "./pages/dashboard/leads/LeadManagement";
import ProfilePage from "./pages/dashboard/profile/ProfilePage";
import TrainingModules from "./pages/dashboard/training/TrainingModules";
import AnalyticsPage from "./pages/dashboard/analytics/AnalyticsPage";
import SettingsPage from "./pages/dashboard/settings/SettingsPage";
import CampaignsPage from "./pages/dashboard/campaigns/CampaignsPage"; 
import FactoryDirectory from "./pages/directory/FactoryDirectory";
import IndustryPage from "./pages/directory/IndustryPage";
import FactoryMicrosite from "./pages/factory/FactoryMicrosite";
import { useAuth } from "./context/AuthContext";

const queryClient = new QueryClient();

// Role-based route component
const RoleBasedProductRoute = () => {
  const { user } = useAuth();
  
  if (user?.role === "factory" || user?.role === "admin") {
    return <ProductManagement />;
  } else {
    return <ProductBrowser />;
  }
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route element={<Layout />}>
            <Route path="/" element={<Index />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/unauthorized" element={<Unauthorized />} />
            <Route path="/factories" element={<FactoryDirectory />} />
            <Route path="/industries/:industryId" element={<IndustryPage />} />
            <Route path="/factory/:factoryId" element={<FactoryMicrosite />} />
          </Route>

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route element={<DashboardLayout />}>
              <Route path="/dashboard" element={<DashboardHome />} />
              
              {/* Products Routes - Role-based rendering */}
              <Route 
                path="/dashboard/products" 
                element={<RoleBasedProductRoute />} 
              />
              <Route 
                path="/dashboard/products/:productId" 
                element={<ProductDetails />} 
              />
              
              {/* Lead Management Routes */}
              <Route 
                path="/dashboard/leads" 
                element={<LeadManagement />} 
              />
              
              {/* Profile Page */}
              <Route
                path="/dashboard/profile"
                element={<ProfilePage />}
              />

              {/* Training Page (for marketers) */}
              <Route
                path="/dashboard/training"
                element={
                  <ProtectedRoute allowedRoles={["marketer"]}>
                    <TrainingModules />
                  </ProtectedRoute>
                }
              />
              
              {/* Campaigns Page (for marketers) */}
              <Route
                path="/dashboard/campaigns"
                element={
                  <ProtectedRoute allowedRoles={["marketer"]}>
                    <CampaignsPage />
                  </ProtectedRoute>
                }
              />
              
              {/* Factory-specific routes */}
              <Route 
                path="/dashboard/marketers" 
                element={
                  <ProtectedRoute allowedRoles={["factory", "admin"]}>
                    <div>Marketers Page - Coming Soon</div>
                  </ProtectedRoute>
                } 
              />
              
              {/* Admin-specific routes */}
              <Route 
                path="/dashboard/factories" 
                element={
                  <ProtectedRoute allowedRoles={["admin"]}>
                    <div>Factories Management - Coming Soon</div>
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/dashboard/content" 
                element={
                  <ProtectedRoute allowedRoles={["admin"]}>
                    <div>Content Management - Coming Soon</div>
                  </ProtectedRoute>
                } 
              />
              
              {/* Common routes */}
              <Route path="/dashboard/analytics" element={<AnalyticsPage />} />
              <Route path="/dashboard/settings" element={<SettingsPage />} />
            </Route>
          </Route>
          
          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
