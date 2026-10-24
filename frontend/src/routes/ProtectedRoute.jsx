import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

/**
 * ProtectedRoute component:
 * - Waits for initial session verification (loading = true) to finish
 * - Redirects guests to /login if no valid session
 * - Renders protected children components if authenticated
 */
function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  // Show a minimal, clean spinner while verifying session on page refresh
  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-[#fdfbf7]">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-gray-300 border-t-[#9f815d]"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;