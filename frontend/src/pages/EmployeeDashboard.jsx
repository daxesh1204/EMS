import { Outlet } from 'react-router-dom';
import { useAuth } from '../../context/authContext'
import { SidebarEmployee } from '../components/EmployeeDashboard/SidebarEmployee';
import { Navbar } from '../components/dashbaord/Navbar';

export const EmployeeDashboard = () => {
  const {user}=useAuth();
  return (
   <div className="flex">
      <SidebarEmployee />
      <div className="flex-1 ml-64 bg-gray-100 h-screen">
        <Navbar />
        <Outlet />
      </div>
    </div>
  )
}
