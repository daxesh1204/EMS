import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { columns, AttendanceHelper } from "../../utils/AttendanceHelper";
import DataTable from "react-data-table-component";

export const Attendance = () => {
  const [attendance, setAttendance] = useState([]);
  const [Loading, setLoading] = useState(false);
  const [filterAttendance, setFilteredAttendance] = useState([]);
  const apiUrl = import.meta.env.VITE_CONN_URL;


  const statusChange=()=>{
    fetchAttendance();
  }
  // FETCH THE Attendance DATA
  const fetchAttendance = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${apiUrl}/api/attendance`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      // console.log("Attendance Report",res.data);
      if (res.data.success) {
        let sno = 1;
        const data = await res.data.attendance.map((attend) => ({
          employeeId: attend.employeeId.employeeId,
          sno: sno++,
          dept_name: attend.employeeId.department.dept_name,
          name: attend.employeeId.userId.name,
          action: <AttendanceHelper status={attend.status} employeeId={attend.employeeId.employeeId} statusChange={statusChange}/>,
        }));
        setAttendance(data);
        setFilteredAttendance(data);
      }
    } catch (error) {
      console.log(error);
      // if (error.response && !error.response.data.success) {
      //   console.log(error.response.data.message);
      // }
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchAttendance();
  }, []);

  const handleFilter = (e) => {
    const records = attendance.filter((emp) => {
      return emp.employeeId
        .toLowerCase()
        .includes(e.target.value.toLowerCase());
    });
    setFilteredAttendance(records);
  };

  if (!filterAttendance) {
    return <div>Loading...</div>;
  }
  return (
    <div className="p-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold">Manage Attendacence</h3>
      </div>
      <div className="flex justify-between items-center mt-4  ">
        <input
          type="text"
          placeholder="Search By Employee Name"
          className="px-4 py-0.5 border"
          onChange={handleFilter}
        />
        <p className="text-2xl -ml-20">
          Mark Employees for{" "}
          <span className="font-bold underline">
            {new Date().toISOString().split("T")[0]}
          </span>
        </p>
        <Link
          to="/admin-dashboard/attendance-report"
          className="px-4 py-1 bg-teal-600 rounded text-white"
        >
          Attendance Report
        </Link>
      </div>
      <div className="mt-6">
        <DataTable columns={columns} data={filterAttendance} pagination />
      </div>
    </div>
  );
};
