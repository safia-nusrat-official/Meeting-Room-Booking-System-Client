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
      <ProtectedRoute>
        <AdminDashboard></AdminDashboard>
      </ProtectedRoute>
    ),
  },
  {
    path: "create-room",
    element: (
      <ProtectedRoute>
        <CreateRoom></CreateRoom>
      </ProtectedRoute>
    ),
  },
  {
    path: "create-slot",
    element: (
      <ProtectedRoute>
        <CreateSlot></CreateSlot>
      </ProtectedRoute>
    ),
  },
  {
    name: "Manage Rooms",
    path: "rooms-list",
    element: (
      <ProtectedRoute>
        <RoomListTable></RoomListTable>
      </ProtectedRoute>
    ),
  },
  {
    name: "Manage Bookings",
    path: "bookings-list",
    element: (
      <ProtectedRoute>
        <BookingListsTable></BookingListsTable>
      </ProtectedRoute>
    ),
  },
  {
    name: "Manage Slots",
    path: "slots-list",
    element: (
      <ProtectedRoute>
        <SlotListTable></SlotListTable>
      </ProtectedRoute>
    ),
  },
  {
    name: "Manage Users",
    path: "all-users",
    element: (
      <ProtectedRoute>
        <UsersList></UsersList>
      </ProtectedRoute>
    ),
  },
];
