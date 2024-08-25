import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { generateRoutes } from "../utility/routeUtils/generateRoutes";
import { adminPaths } from "./admin.routes";
import { userPaths } from "./user.routes";
import Home from "../pages/home/Home";
import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";
import Rooms from "../pages/rooms/Rooms";
import AboutUs from "../pages/aboutUs/AboutUs";
import ContactUs from "../pages/contactUs/ContactUs";

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
        path: "/meeting-rooms",
        element: <Rooms></Rooms>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/signup",
        element: <Signup></Signup>,
      },
    ],
  },
  {
    path: "/admin",
    element: <App></App>,
    children: generateRoutes(adminPaths),
  },
  {
    path: "/user",
    element: <App></App>,
    children: generateRoutes(userPaths),
  },
]);
