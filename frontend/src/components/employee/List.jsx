import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { columns, EmployeeButtons } from "../../utils/EmployeeHelper";
import DataTable from "react-data-table-component";

export const List = () => {
  const [employees, setEmployees] = useState([]);
  const [empLoading, setEmpLoading] = useState(false);
  const [filterEmployee, setFilteredEmployees] = useState([]);
  const apiUrl = import.meta.env.VITE_CONN_URL;

  useEffect(() => {
    // FETCH THE DEPARTMENT DATA
    const fetchEmployees = async () => {
      setEmpLoading(true);
      try {
        const res = await axios.get(`${apiUrl}/api/employee/getEmp`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        // console.log("Get Employees",res.data.employees);
        if (res.data.success) {
          let sno = 1;
          const data = await res.data.employees.map((emp) => ({
            _id: emp._id,
            sno: sno++,
            dept_name: emp.department.dept_name,
            name: emp.userId.name,
            dob: new Date(emp.dob).toLocaleDateString(),
            profileImage: (
              <img
                src={`${apiUrl}/${emp.userId.profileImage}`}
                width={40}
                className="rounded-full"
              />
            ),
            action: <EmployeeButtons id={emp._id} />,
          }));
          setEmployees(data);
          setFilteredEmployees(data);
        }
      } catch (error) {
        console.log(error.message);
        // if (error.response && !error.response.data.success) {
        //   console.log(error.response.data.message);
        // }
      } finally {
        setEmpLoading(false);
      }
    };
    fetchEmployees();
  }, []);

  const handleFilter=(e)=>{
    const records=employees.filter((emp)=>{
      return emp.name.toLowerCase().includes(e.target.value.toLowerCase());
  })
    setFilteredEmployees(records);
  }
  
  return (
    <div className="p-5">
      <div className="text-center">
        <h3 className="text-2xl font-bold">Manage Employee</h3>
      </div>
      <div className="flex justify-between items-center">
        <input
          type="text"
          placeholder="Search By Employee Name"
          className="px-4 py-0.5 border"
          onChange={handleFilter}
        />
        <Link
          to="/admin-dashboard/add-employee"
          className="px-4 py-1 bg-teal-600 rounded text-white"
        >
          Add New Employee
        </Link>
      </div>
      <div className="mt-6">
        <DataTable columns={columns} data={filterEmployee} pagination />
      </div>
    </div>
  );
};
