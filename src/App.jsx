import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./Pages/DashBoard";
import MainLayout from "./layout/MainLayout";
import { useEffect } from "react";
import Register from "./Pages/Register";
import ProtectedRoute from "./routes/ProtectedRoute";
import SignIn from "./Pages/SignIn";
import { useSocket } from "./ContextAndHooks/SocketContext";
import { useAuth } from "./ContextAndHooks/AuthContext";
export default function App() {
  const socket = useSocket();
  const { user } = useAuth();
  useEffect(() => {
    if (socket && user) {
      // Emit user ID when the component mounts
      socket.emit("userid", user.phone);
    }
  }, [socket, user?.phone]); // Dependency array ensures that the effect runs only when the socket or user.phone changes
  return (
    <Router>
      <Routes>
        <Route index path="/auth/register" element={<Register />} />
        <Route path="/auth/login" element={<SignIn />} />
        <Route element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>
            <Route index element={<Dashboard />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}
