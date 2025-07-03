import { useEffect, useState } from "react";
import { fetchDepartments, getEmployees } from "../../utils/EmployeeHelper";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const AddSalary = () => {
  const [salary, setSalary] = useState({
    employeeId:null,
    basicSalary: 0,
    allowances: 0,
    deductions: 0,
    payDate: null,
  });
  const [departments, setDepartments] = useState(null);
  const [emp, setEmp] = useState([]);
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_CONN_URL;

  useEffect(() => {
    const getDepartments = async () => {
      const departments = await fetchDepartments();
      setDepartments(departments);
    };
    getDepartments();
  }, []);

  const handleDepartment = async (e) => {
    const emps = await getEmployees(e.target.value);
    setEmp(emps);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSalary((prevData) => ({...prevData,[name]: value}));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      //  console.log("Sending API request to:", `${apiUrl}/api/employee/add/${id}`);
      const res = await axios.post(`${apiUrl}/api/salary/add`, salary, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log("API Response:", res.data);
      if (res.data.success) {
        toast.success("Salary Added successfully!!");
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
      {departments && emp ? (
        <div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
          <h2 className="text-2xl font-bold mb-6">Add Salary</h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   
              {/* Department */}
              <div>
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
                  onChange={handleDepartment}
                  value={salary.department}
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

              {/* Employeee */}
              <div>
                <label
                  htmlFor="employeeId"
                  className="block text-sm font-medium text-gray-700"
                >
                  Employee
                </label>
                <select
                  name="employeeId"
                  placeholder="Enter department"
                  required
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                  onChange={handleChange}
                >
                  <option value="">Select Employee</option>
                  {emp.map((emp) => {
                    return (
                      <option key={emp._id} value={emp._id}>
                        {emp.employeeId}
                      </option>
                    );
                  })}
                </select>
              </div>

              {/* Basic Salary */}
              <div>
                <label
                  htmlFor="basicSalary"
                  className="block text-sm font-medium text-gray-700"
                >
                  Basic Salary
                </label>
                <input
                  type="number"
                  name="basicSalary"
                  placeholder="Basic Salary"
                  required
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                  onChange={handleChange}
                />
              </div>

            {/* Salary Allowence */}
               <div>
                <label
                  htmlFor="allowances"
                  className="block text-sm font-medium text-gray-700"
                >
                  Allowances
                </label>
                <input
                  type="number"
                  name="allowances"
                  placeholder="Enter salary"
                  required
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                  onChange={handleChange}
                />
              </div>

            {/* Deduction */}
              <div>
                <label
                  htmlFor="allowances"
                  className="block text-sm font-medium text-gray-700"
                >
                  Deductions
                </label>
                <input
                  type="number"
                  name="deductions"
                  placeholder="deductions"
                  required
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                  onChange={handleChange}
                />
              </div>

            {/* PayDate */}
             <div>
                <label
                  htmlFor="payDate"
                  className="block text-sm font-medium text-gray-700"
                >
                 Pay Date
                </label>
                <input
                  type="date"
                  name="payDate"
                  required
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                  onChange={handleChange}
                />
             </div>

            </div>
            <button
              type="submit"
              className="w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
            >
             Add Salary
            </button>
          </form>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};
