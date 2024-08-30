import CreateRoom from "@/pages/adminPages/roomManagement/CreateRoom";
import AdminDashboard from "../pages/adminPages/AdminDashboard";
import ProtectedRoute from "../pages/ProtectedRoute";
import CreateSlot from "@/pages/adminPages/slotsManagement/CreateSlot";
import RoomListTable from "@/pages/adminPages/roomManagement/RoomListTable";
import BookingListsTable from "@/pages/adminPages/bookingManagement/BookingsListTable";
import SlotListTable from "@/pages/adminPages/slotsManagement/SlotListTable";
import UsersList from "@/pages/adminPages/UsersList";
import Checkout from "@/pages/userPages/checkout/Checkout";
import CreateBooking from "@/pages/userPages/bookings/CreateBooking";
import MyBookings from "@/pages/userPages/bookings/MyBookings";
import MyProfile from "@/pages/userPages/profile/MyProfile";

export const userPaths = [
  {
    name: "Dashboard",
    index: true,
    path: "dashboard",
    element: (
      <ProtectedRoute>
        <AdminDashboard></AdminDashboard>
      </ProtectedRoute>
    ),
  },
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
      <ProtectedRoute role="user">
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
