import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const View = () => {
  const apiUrl = import.meta.env.VITE_CONN_URL;
  const { id } = useParams();
  
  const [employee, setEmployee] = useState(null);
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await axios.get(`${apiUrl}/api/employee/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        // console.log("api response", res.data);
        // console.log("res.data.success type:", typeof res.data.success, "value:", res.data.success);
        if (res.data.success) {
          setEmployee(res.data.employees);
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          console.log(error.response.data.message);
        }
      }
    };
    fetchEmployees();
  }, []);

  return (
    <>
      {employee ? (
        <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
          <h2 className="text-2xl font-bold mb-8 text-center">Employee Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <img
                src={`${apiUrl}/${employee.userId.profileImage}`}
                alt="profileImage"
                className="w-72 rounded-full border"
              />
            </div>
            <div>
              <div className="flex space-x-3 mb-5">
                <p className="text-lg font-bold">Name:</p>
                <p className="font-medium">{employee.userId.name}</p>
              </div>
              <div className="flex space-x-3 mb-5">
                <p className="text-lg font-bold">Employee ID:</p>
                <p className="font-medium">{employee.employeeId}</p>
              </div>
              <div className="flex space-x-3 mb-5">
                <p className="text-lg font-bold">Date of Birth:</p>
                <p className="font-medium">{new Date(employee.dob).toLocaleDateString()}</p>
              </div>
              <div className="flex space-x-3 mb-5">
                <p className="text-lg font-bold">Gender:</p>
                <p className="font-medium">{employee.gender}</p>
              </div>
              <div className="flex space-x-3 mb-5">
                <p className="text-lg font-bold">Department:</p>
                <p className="font-medium">{employee.department.dept_name}</p>
              </div>
              <div className="flex space-x-3 mb-5">
                <p className="text-lg font-bold">Designation:</p>
                <p className="font-medium">{employee.designation}</p>
              </div>
              <div className="flex space-x-3 mb-5">
                <p className="text-lg font-bold">Marital Status:</p>
                <p className="font-medium">{employee.maritalStatus}</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};
