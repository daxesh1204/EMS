import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const AddDepartment = () => {
  const [department, setDepartment] = useState({
    dept_name: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDepartment({ ...department, [name]: value });
  };

  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_CONN_URL;
  // console.log(apiUrl);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${apiUrl}/api/department/add`, department, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });
      console.log("API Response:", res.data);
      if (res.data.success) {
        toast.success("Department added successfully!!")
        navigate("/admin-dashboard/departments");
      }
    } catch (error) {
      console.log(error);
      // if (error.response && !error.response.data.success) {
      //   console.log(error.response.data.error);
      // }
    }
  };
  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md w-96">
      <h3 className="text-2xl font-bold mb-6">Add Department</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label
            htmlFor="dept_name"
            className="text-sm font-medium text-gray-700"
          >
            Department Name
          </label>
          <input
            type="text"
            placeholder="Enter Department Name"
            className="mt-1 w-full p-2 border border-gray-300 rounded-md"
            required
            name="dept_name"
            onChange={handleChange}
          />
        </div>
        <div className="mt-3">
          <label
            htmlFor="description"
            className="text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            name="description"
            placeholder="Enter description"
            rows={4}
            className="mt-1 w-full p-2 border border-gray-300 rounded-md block"
            onChange={handleChange}
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
        >
          Add Department
        </button>
      </form>
    </div>
  );
};
