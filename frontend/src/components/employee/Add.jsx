import { useEffect, useState } from "react";
import { fetchDepartments } from "../../utils/EmployeeHelper";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
export const Add = () => {
  const [departments, setDepartments] = useState([]);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_CONN_URL;

  useEffect(() => {
    const getDepartments = async () => {
      const departments = await fetchDepartments();
      setDepartments(departments);
    };
    getDepartments();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: files[0],
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataObj = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataObj.append(key, formData[key]);
    });

    try {
      //  console.log("Sending API request to:", `${apiUrl}/api/employee/add`);
      const res = await axios.post(`${apiUrl}/api/employee/add`, formDataObj, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log("API Response:", res.data);
      if (res.data.success) {
        toast.success("Employee Added Successfull!!");
        navigate("/admin-dashboard/employees");
      }
    } catch (error) {
      // console.log(error);
      if (error.response && !error.response.data.success) {
        console.log(error.response.data.error);
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-6">Add New Employee</h2>
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
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your valid email"
              required
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              onChange={handleChange}
            />
          </div>

          <div>
            <label
              htmlFor="employeeId"
              className="block text-sm font-medium text-gray-700"
            >
              Employee ID
            </label>
            <input
              type="text"
              name="employeeId"
              placeholder="Enter Employee ID"
              required
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              onChange={handleChange}
            />
          </div>

          <div>
            <label
              htmlFor="dob"
              className="block text-sm font-medium text-gray-700"
            >
              Date of Birth
            </label>
            <input
              type="date"
              name="dob"
              placeholder="DOB"
              required
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              onChange={handleChange}
            />
          </div>

          <div>
            <label
              htmlFor="gender"
              className="block text-sm font-medium text-gray-700"
            >
              Gender
            </label>
            <select
              name="gender"
              id="gender"
              required
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              onChange={handleChange}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
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
            />
          </div>

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
              onChange={handleChange}
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
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              required
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              onChange={handleChange}
            />
          </div>

          <div>
            <label
              htmlFor="role"
              className="block text-sm font-medium text-gray-700"
            >
              Role
            </label>
            <select
              name="role"
              id="role"
              required
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              onChange={handleChange}
            >
              <option value="">Select Role</option>
              <option value="admin">Admin</option>
              <option value="employee">Employee</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="image"
              className="block text-sm font-medium text-gray-700"
            >
              Upload Image
            </label>
            <input
              type="file"
              name="image"
              placeholder="Upload Image"
              accept="image/*"
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              onChange={handleChange}
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
        >
          Add Employee
        </button>
      </form>
    </div>
  );
};
