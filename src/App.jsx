import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./Pages/DashBoard";
import MainLayout from "./layout/MainLayout";
import Register from "./Pages/Register";
import ProtectedRoute from "./routes/ProtectedRoute";
import SignIn from "./Pages/SignIn";
export default function App() {
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
