import { Outlet } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import { AdminSideBar } from "../components/dashbaord/AdminSideBar";
import { Navbar } from "../components/dashbaord/Navbar";

export const AdminDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="">
      <AdminSideBar />
      <div className="flex-1 ml-64 bg-gray-100 h-screen">
        <Navbar />
        <Outlet />
      </div>
    </div>
  );
};
