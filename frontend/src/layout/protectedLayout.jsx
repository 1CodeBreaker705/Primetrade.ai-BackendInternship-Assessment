import { Navigate, Outlet } from "react-router-dom";
import Navbar from "../pages/components/Navbar";

export default function ProtectedLayout() {
  const token = localStorage.getItem("access_token");

  if (!token) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}