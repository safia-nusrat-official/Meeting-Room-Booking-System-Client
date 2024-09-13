import CreateRoom from "@/pages/adminPages/roomManagement/CreateRoom";
import AdminDashboard from "../pages/adminPages/dashboard/AdminDashboard";
import ProtectedRoute from "../pages/ProtectedRoute";
import CreateSlot from "@/pages/adminPages/slotsManagement/CreateSlot";
import RoomListTable from "@/pages/adminPages/roomManagement/RoomListTable";
import BookingListsTable from "@/pages/adminPages/bookingManagement/BookingsListTable";
import SlotListTable from "@/pages/adminPages/slotsManagement/SlotListTable";
import UsersList from "@/pages/adminPages/userManagement/UsersList";

export const adminPaths = [
  {
    name: "Dashboard",
    index: true,
    path: "dashboard",
    element: (
      <ProtectedRoute role="admin">
        <AdminDashboard></AdminDashboard>
      </ProtectedRoute>
    ),
  },
  {
    path: "create-room",
    element: (
      <ProtectedRoute role="admin">
        <CreateRoom></CreateRoom>
      </ProtectedRoute>
    ),
  },
  {
    path: "create-slot",
    element: (
      <ProtectedRoute role="admin">
        <CreateSlot></CreateSlot>
      </ProtectedRoute>
    ),
  },
  {
    name: "Manage Rooms",
    path: "rooms-list",
    element: (
      <ProtectedRoute role="admin">
        <RoomListTable></RoomListTable>
      </ProtectedRoute>
    ),
  },
  {
    name: "Manage Bookings",
    path: "bookings-list",
    element: (
      <ProtectedRoute role="admin">
        <BookingListsTable></BookingListsTable>
      </ProtectedRoute>
    ),
  },
  {
    name: "Manage Slots",
    path: "slots-list",
    element: (
      <ProtectedRoute role="admin">
        <SlotListTable></SlotListTable>
      </ProtectedRoute>
    ),
  },
  {
    name: "Manage Users",
    path: "all-users",
    element: (
      <ProtectedRoute role="admin">
        <UsersList></UsersList>
      </ProtectedRoute>
    ),
  }
];
