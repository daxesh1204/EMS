import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";
import { Login } from "./pages/Login";
import { AdminDashboard } from "./pages/AdminDashboard";
import { EmployeeDashboard } from "./pages/EmployeeDashboard";
import { PrivateRoutes } from "./utils/PrivateRoutes";
import { RoleBasedRoutes } from "./utils/RoleBasedRoutes";
import { AdminSummary } from "./components/dashbaord/AdminSummary";
import { DeparmentList } from "./components/department/DepartmentList";
import { AddDepartment } from "./components/department/AddDepartment";
import { EditDepartment } from "./components/department/EditDepartment";
import { List } from "./components/employee/List";
import { Add } from "./components/employee/Add";
import { ToastContainer } from "react-toastify";
import { View } from "./components/employee/View";
import { Edit } from "./components/employee/Edit";
import { AddSalary } from "./components/salary/AddSalary";
import { ViewSalary } from "./components/salary/ViewSalary";
import { Summary } from "./components/EmployeeDashboard/Summary";
import { LeavesList } from "./components/leave/LeavesList";
import { AddNewLeave } from "./components/leave/AddNewLeave";
import { Setting } from "./components/EmployeeDashboard/Setting";
import { Table } from "./components/leave/Table";
import { Detail } from "./components/leave/Detail";
import { Attendance } from "./components/attendance/Attendance";
import { AttendanceReport } from "./components/attendance/AttendanceReport";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Navigate to="admin-dashboard" />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route
          path="/admin-dashboard"
          element={
            <PrivateRoutes>
              <RoleBasedRoutes requiredRole={["admin"]}>
                <AdminDashboard />
              </RoleBasedRoutes>
            </PrivateRoutes>
          }
        >
          <Route index element={<AdminSummary />}></Route>
          <Route
            path="/admin-dashboard/departments"
            element={<DeparmentList />}
          ></Route>
          <Route
            path="/admin-dashboard/add-dept"
            element={<AddDepartment />}
          ></Route>
          <Route
            path="/admin-dashboard/department/:id"
            element={<EditDepartment />}
          ></Route>
          <Route path="/admin-dashboard/employees" element={<List />}></Route>
          <Route path="/admin-dashboard/add-employee" element={<Add />}></Route>
          <Route
            path="/admin-dashboard/employees/:id"
            element={<View />}
          ></Route>
          <Route
            path="/admin-dashboard/employees/edit/:id"
            element={<Edit />}
          ></Route>
          <Route
            path="/admin-dashboard/employees/salary/:id"
            element={<ViewSalary />}
          ></Route>
          <Route
            path="/admin-dashboard/salary/add"
            element={<AddSalary />}
          ></Route>
          <Route path="/admin-dashboard/leaves" element={<Table/>}></Route>
          <Route path="/admin-dashboard/leaves/:id" element={<Detail/>}></Route>
          <Route path="/admin-dashboard/employees/leaves/:id"  element={<LeavesList/>}></Route>
          <Route path="/admin-dashboard/setting" element={<Setting/>}></Route>
          <Route path="/admin-dashboard/attendance" element={<Attendance/>}></Route>
          <Route path="/admin-dashboard/attendance-report" element={<AttendanceReport/>}></Route>
        </Route>
        <Route
          path="/employee-dashboard"
          element={
            <PrivateRoutes>
              <RoleBasedRoutes requiredRole={["employee"]}>
                <EmployeeDashboard />
              </RoleBasedRoutes>
            </PrivateRoutes>
          }
        >
          <Route index element={<Summary />}></Route>
          <Route path="/employee-dashboard/profile/:id" element={<View />}></Route>
          <Route path="/employee-dashboard/leaves/:id" element={<LeavesList/>}></Route>
          <Route path="/employee-dashboard/add-leave" element={<AddNewLeave/>}></Route>
          <Route path="/employee-dashboard/salary/:id" element={<ViewSalary/>}></Route>
          <Route path="/employee-dashboard/setting" element={<Setting/>}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
