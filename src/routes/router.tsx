import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { generateRoutes } from "../utility/routeUtils/generateRoutes";
import { adminPaths } from "./admin.routes";
import Home from "../pages/home/Home";
import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";
import Rooms from "../pages/rooms/Rooms";
import AboutUs from "../pages/aboutUs/AboutUs";
import ContactUs from "../pages/contactUs/ContactUs";
import AdminLayout from "@/layout/AdminLayout";
import ProtectedRoute from "@/pages/ProtectedRoute";
import RoomDetails from "@/pages/rooms/RoomDetails";
import { userPaths } from "./user.routes";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/about-us",
        element: <AboutUs></AboutUs>,
      },
      {
        path: "/contact-us",
        element: <ContactUs></ContactUs>,
      },
      {
        path: "/rooms",
        element: <Rooms></Rooms>,
      },
      {
        path: "/rooms/:id",
        element: (
          <ProtectedRoute>
            <RoomDetails></RoomDetails>
          </ProtectedRoute>
        ),
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/signup",
        element: <Signup></Signup>,
      }
    ],
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute role="admin">
        <AdminLayout></AdminLayout>
      </ProtectedRoute>
    ),
    children: generateRoutes(adminPaths),
  },
  {
    path: "/user",
    element: (
      <ProtectedRoute role="user">
        <AdminLayout></AdminLayout>
      </ProtectedRoute>
    ),
    children: generateRoutes(userPaths),
  },
]);
