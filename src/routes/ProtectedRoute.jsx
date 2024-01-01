import { Outlet, Navigate } from "react-router-dom";
import { useBetContext } from "../ContextAndHooks/BetContext";
import { useEffect } from "react";

export default function ProtectedRoute() {
  const { dispatch } = useBetContext();
  const token = localStorage.getItem("token");
  const tokenExpiry = localStorage.getItem("tokenExpiry");
  const currentDate = new Date().getTime();

  useEffect(() => {
    // Check the user's login status
    if (tokenExpiry && currentDate < parseInt(tokenExpiry, 10)) {
      // Token is still valid
      console.log("Token is still valid");
      dispatch({ type: "setLogin", payload: !!token });
    } else {
      // Token has expired or not found
      console.log("Token has expired or not found");
    }
  }, []);

  if (!token || !tokenExpiry) {
    return <Navigate to="/auth/login" replace />;
  }

  return <Outlet />;
}
