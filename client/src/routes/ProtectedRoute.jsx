import { Navigate, Outlet } from "react-router-dom";
import useAuthContext from "../hooks/useAuthContext"


function ProtectedRoute() {
  const { user } = useAuthContext();

  return user ? <Outlet /> : <Navigate to='/log-in' replace />
};

export default ProtectedRoute;