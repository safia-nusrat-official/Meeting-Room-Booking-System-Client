import MyBookings from "../pages/userPages/bookings/MyBookings";
import ProtectedRoute from "../pages/ProtectedRoute";

export const userPaths = [
  {
    name: "My Bookings",
    path: "my-bookings",
    element: (
      <ProtectedRoute>
        <MyBookings></MyBookings>
      </ProtectedRoute>
    ),
  },
];
