import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const EditDepartment = () => {

  const { id } = useParams(); //useParams is use to get id from URL
  const [department, setDepartment] = useState([]);
  const navigate=useNavigate();
  const [deptLoading, setDeptLoading] = useState(false);
  const apiUrl = import.meta.env.VITE_CONN_URL;

  useEffect(() => {
    const fetchDepartments = async () => {
      setDeptLoading(true);
      try {
        const res = await axios.get(`${apiUrl}/api/department/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        // console.log("api response", res.data);
        // console.log("res.data.success type:", typeof res.data.success, "value:", res.data.success);
        if (res.data.success) {
          setDepartment(res.data.department);
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          console.log(error.response.data.message);
        }
      } finally {
        setDeptLoading(false);
      }
    };
    fetchDepartments();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDepartment({ ...department, [name]: value });
  };
  // console.log("Rendered Department:", department);

  const handleSubmit=async(e)=>{
    e.preventDefault();
    try {
          const res = await axios.put(`${apiUrl}/api/department/${id}`, department, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "application/json",
            },
          });
          console.log("API Response:", res.data);
          if (res.data.success) {
            navigate("/admin-dashboard/departments");
          }
        } catch (error) {
          console.log(error);
          // if (error.response && !error.response.data.success) {
          //   console.log(error.response.data.error);
          // }
        }
  }


  return (
    <>
      {deptLoading? (
        <div>Loading...</div>
      ) : (
        <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md w-96">
          <h3 className="text-2xl font-bold mb-6">Edit Department</h3>
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
                value={department.dept_name}
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
                value={department.description}
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
            >
              Edit Department
            </button>
          </form>
        </div>
      )}
    </>
  );
};
