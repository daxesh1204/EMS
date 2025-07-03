import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import {
  columns,
  customStyle,
  DepartmentButtons,
} from "../../utils/DepartmentHelper";
import { useEffect, useState } from "react";
import axios from "axios";

export const DeparmentList = () => {
  const [departments, setDepartment] = useState([]);
  const [deptLoading, setDeptLoading] = useState(false);
  const [filterDept, setFilteredDept] = useState([]);
  const apiUrl = import.meta.env.VITE_CONN_URL;

  const onDepartmentDelete = (deletedId) => {
    setDepartment((prev) => prev.filter((dept) => dept._id !== deletedId));
    setFilteredDept((prev) => prev.filter((dept) => dept._id !== deletedId));
  };

  useEffect(() => {
    // FETCH THE DEPARTMENT DATA
    const fetchDepartments = async () => {
      setDeptLoading(true);
      try {
        const res = await axios.get(`${apiUrl}/api/department/get`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        // console.log(res.data.departments);
        if (res.data.success) {
          let sno = 1;
          const data = await res.data.departments.map((dept) => ({
            _id: dept._id,
            sno: sno++,
            dept_name: dept.dept_name,
            description: dept.description,
            action: (
              <DepartmentButtons
                id={dept._id}
                onDepartmentDelete={onDepartmentDelete}
              />
            ),
          }));
          setDepartment(data);
          setFilteredDept(data);
        }
      } catch (error) {
        // console.log(error);
        if (error.response && !error.response.data.success) {
          console.log(error.response.data.message);
        }
      } finally {
        setDeptLoading(false);
      }
    };
    fetchDepartments();
  }, []);

  //SEARCH THE DEPARTMENT DATA
  const filterDepartments = (e) => {
    const records = departments.filter((dept) =>
      dept.dept_name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredDept(records);
  };

  return (
    <>
      {deptLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="p-5">
          <div className="text-center">
            <h3 className="text-2xl font-bold">Manage Departments</h3>
          </div>
          <div className="flex justify-between items-center">
            <input
              type="text"
              placeholder="Search By Dept Name"
              className="px-4 py-0.5 border"
              onChange={filterDepartments}
            />
            <Link
              to="/admin-dashboard/add-dept"
              className="px-4 py-1 bg-teal-600 rounded text-white"
            >
              Add New Department
            </Link>
          </div>
          <div className="mt-5">
            <DataTable
              columns={columns}
              data={filterDept}
              pagination
              customStyles={customStyle}
            />
          </div>
        </div>
      )}
    </>
  );
};
