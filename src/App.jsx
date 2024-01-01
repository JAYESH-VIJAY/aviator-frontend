import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate, // Import Navigate instead of redirect
} from "react-router-dom";
import Dashboard from "./Pages/DashBoard";
import MainLayout from "./layout/MainLayout";
import Register from "./Pages/Register";
import ProtectedRoute from "./routes/ProtectedRoute";
import SignIn from "./Pages/SignIn";
import { useState, useEffect } from "react";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check the user's login status
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);
  return (
    <Router>
      <Routes>
        <Route index element={<Dashboard />} />

        <Route path="/auth/register" element={<Register />} />
        <Route index path="/auth/login" element={<SignIn />} />
        {!isLoggedIn ? (
          // Redirect to /auth/login if the user is not logged in
          <Route path="/" element={<Navigate to="/auth/login" replace />} />
        ) : (
          <Route element={<ProtectedRoute />}>
            <Route element={<MainLayout />}>
              <Route index element={<Dashboard />} />
            </Route>
          </Route>
        )}
      </Routes>
    </Router>
  );
}
