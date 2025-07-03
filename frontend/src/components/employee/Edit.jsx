import { useEffect, useState } from "react";
import { fetchDepartments } from "../../utils/EmployeeHelper";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

export const Edit = () => {
  const [employee, setEmployee] = useState({
    name: "",
    maritalStatus: "",
    designation: "",
    salary: 0,
    department: "",
  });
  const [departments, setDepartments] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_CONN_URL;

  useEffect(() => {
    const getDepartments = async () => {
      const departments = await fetchDepartments();
      setDepartments(departments);
    };
    getDepartments();
  }, []);
  
  
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await axios.get(`${apiUrl}/api/employee/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        // console.log("res.data.success type:", typeof res.data.success, "value:", res.data.success);
        if (res.data.success) {
          const employees = res.data.employees;
          // console.log("employee status",employees);
          setEmployee((prev) => ({
            ...prev,
            name: employees.userId.name,
            maritalStatus: employees.maritalStatus,
            designation:employees.designation,
            salary:employees.salary,
            department:employees.department,
          }));
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          console.log(error.response.data.message);
        }
      }
    };
    fetchEmployees();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
    
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      //  console.log("Sending API request to:", `${apiUrl}/api/employee/add/${id}`);
      const res = await axios.put(`${apiUrl}/api/employee/${id}`,employee, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log("API Response:", res.data);
      if (res.data.success) {
        toast.success("Employee updated successfully!!");
        navigate("/admin-dashboard/employees");
      }
    } catch (error) {
      console.log(error.message);
      if (error.response && !error.response.data.success) {
        console.log(error.response.data.error);
      }
    }
  };

  return (
    <>
      {departments && employee ? (
        <div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
          <h2 className="text-2xl font-bold mb-6">Edit Employee</h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  required
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                  onChange={handleChange}
                  value={employee.name}
                />
              </div>

              <div>
                <label
                  htmlFor="maritalStatus"
                  className="block text-sm font-medium text-gray-700"
                >
                  Marital Status
                </label>
                <select
                  name="maritalStatus"
                  id="maritalStatus"
                  placeholder="Marital Status"
                  required
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                  onChange={handleChange}
                  value={employee.maritalStatus}
                >
                  <option value="">Select Status</option>
                  <option value="single">Single</option>
                  <option value="married">Married</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="designation"
                  className="block text-sm font-medium text-gray-700"
                >
                  Designation
                </label>
                <input
                  type="text"
                  name="designation"
                  placeholder="Designation"
                  required
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                  onChange={handleChange}
                  value={employee.designation}
                />
              </div>

              <div>
                <label
                  htmlFor="salary"
                  className="block text-sm font-medium text-gray-700"
                >
                  Salary
                </label>
                <input
                  type="number"
                  name="salary"
                  placeholder="Enter salary"
                  required
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                  onChange={handleChange}
                  value={employee.salary}
                />
              </div>

              <div className="col-span-2">
                <label
                  htmlFor="department"
                  className="block text-sm font-medium text-gray-700"
                >
                  Department
                </label>
                <select
                  name="department"
                  placeholder="Enter department"
                  required
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                  onChange={handleChange}
                  value={employee.department}
                >
                  <option value="">Select Department</option>
                  {departments.map((dept) => {
                    return (
                      <option key={dept._id} value={dept._id}>
                        {dept.dept_name}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
            <button
              type="submit"
              className="w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
            >
              Edit Employee
            </button>
          </form>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};
