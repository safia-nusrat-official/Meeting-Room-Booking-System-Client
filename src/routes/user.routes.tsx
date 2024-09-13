import ProtectedRoute from "../pages/ProtectedRoute";
import Checkout from "@/pages/userPages/checkout/Checkout";
import CreateBooking from "@/pages/userPages/bookings/CreateBooking";
import MyBookings from "@/pages/userPages/bookings/MyBookings";
import MyProfile from "@/pages/userPages/profile/MyProfile";

export const userPaths = [
  {
    path: "create-booking/:id",
    element: (
      <ProtectedRoute role="user">
        <CreateBooking></CreateBooking>
      </ProtectedRoute>
    ),
  },
  {
    name: "My Bookings",
    path: "my-bookings",
    element: (
      <ProtectedRoute>
        <MyBookings></MyBookings>
      </ProtectedRoute>
    ),
  },
  {
    name: "My Profile",
    path: "my-profile",
    element: (
      <ProtectedRoute>
        <MyProfile></MyProfile>
      </ProtectedRoute>
    ),
  },
  {
    path: "checkout/:id",
    element: (
      <ProtectedRoute role="user">
        <Checkout></Checkout>
      </ProtectedRoute>
    ),
  },
];
