
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { ShieldAlert } from "lucide-react";

export default function Unauthorized() {
  const { user } = useAuth();

  return (
    <div className="container max-w-md py-16 text-center">
      <div className="flex justify-center mb-6">
        <div className="p-4 bg-red-100 rounded-full">
          <ShieldAlert className="h-16 w-16 text-red-500" />
        </div>
      </div>
      
      <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
      <p className="text-gray-600 mb-8">
        {user ? (
          <>
            Your account type ({user.role}) doesn't have permission to access this area.
          </>
        ) : (
          <>
            You don't have permission to access this area.
          </>
        )}
      </p>
      
      <div className="space-y-4">
        <Link to="/dashboard">
          <Button variant="outline" className="w-full">
            Go to Dashboard
          </Button>
        </Link>
        <Link to="/">
          <Button className="w-full">
            Return to Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
