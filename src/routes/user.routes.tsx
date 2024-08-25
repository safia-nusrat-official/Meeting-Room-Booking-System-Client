import Bookings from "../pages/bookings/Bookings";
import ProtectedRoute from "../pages/ProtectedRoute";

export const userPaths = [
  {
    name: "My Bookings",
    path: "my-bookings",
    element: (
      <ProtectedRoute>
        <Bookings></Bookings>
      </ProtectedRoute>
    ),
  }
];
