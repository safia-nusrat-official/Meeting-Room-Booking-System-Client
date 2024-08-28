import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { getAccessToken, logout } from "../redux/features/authSlice";
import { verifyToken } from "@/utility/authUtils/verifyToken";
import { TUser } from "@/types/user.types";

const ProtectedRoute = ({
  children,
  role,
}: {
  children: ReactNode;
  role?: "user" | "admin";
}) => {
  const token = useAppSelector(getAccessToken);
  if (!token) {
    return <Navigate to="/login" replace={true}></Navigate>;
  }
  const user = verifyToken(token) as TUser;
  const dispatch = useAppDispatch();

  if (role && role !== user.role) {
    dispatch(logout());
    return <Navigate to="/login" replace={true}></Navigate>;
  }
  return children;
};

export default ProtectedRoute;
