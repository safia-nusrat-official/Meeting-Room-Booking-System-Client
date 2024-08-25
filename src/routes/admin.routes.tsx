import AdminDashboard from "../pages/adminPages/AdminDashboard";
import ProtectedRoute from "../pages/ProtectedRoute";

export const adminPaths = [
  {
    name: "Dashboard",
    index: true,
    path: "dashboard",
    element: (
      <ProtectedRoute>
        <AdminDashboard></AdminDashboard>
      </ProtectedRoute>
    ),
  }
];
