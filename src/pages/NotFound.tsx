
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const isMobile = useIsMobile();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 px-4">
      <div className="max-w-md w-full text-center bg-white p-8 rounded-lg shadow-md">
        <div className="mb-6">
          <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-red-500 text-5xl font-bold">404</span>
          </div>
          <h1 className="text-2xl font-bold mb-2">Page Not Found</h1>
          <p className="text-gray-600 mb-6">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <Button asChild variant="outline" size={isMobile ? "lg" : "default"} className="w-full">
            <Link to="/">
              <Home className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
          <Button asChild size={isMobile ? "lg" : "default"} className="w-full">
            <Link to="/dashboard">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Go to Dashboard
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
