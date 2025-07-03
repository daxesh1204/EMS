import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const Detail = () => {
  const apiUrl = import.meta.env.VITE_CONN_URL;
  const { id } = useParams();
  const [leave, setLeaves] = useState(null);
  const navigate=useNavigate();

  useEffect(() => {
    const fetchLeave = async () => {
      try {
        const res = await axios.get(`${apiUrl}/api/leave/detail/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        // console.log("api response", res.data);
        if (res.data.success) {
          setLeaves(res.data.leave);
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          console.log(error.response.data.message);
        }
      }
    };
    fetchLeave();
  }, []);

  const changeStatus=async(id,status)=>{
       try {
        const res = await axios.put(`${apiUrl}/api/leave/${id}`, {status},{
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (res.data.success) {
          navigate("/admin-dashboard/leaves")
        }
      } catch (error) {
        console.log(error);
        
        if (error.response && !error.response.data.success) {
          console.log(error.response.data.message);
        }
      }
  }
  return (
    <>
      {leave ? (
        <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
          <h2 className="text-2xl font-bold mb-8 text-center">Leave Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <img
                src={`${apiUrl}/${leave.employeeId.userId.profileImage}`}
                alt="profileImage"
                className="w-72 rounded-full border"
              />
            </div>
            <div>
              <div className="flex space-x-3 mb-2">
                <p className="text-lg font-bold">Name:</p>
                <p className="font-medium">{leave.employeeId.userId.name}</p>
              </div>
              <div className="flex space-x-3 mb-2">
                <p className="text-lg font-bold">Employee ID:</p>
                <p className="font-medium">{leave.employeeId.employeeId}</p>
              </div>
              <div className="flex space-x-3 mb-2">
                <p className="text-lg font-bold">LeaveType:</p>
                <p className="font-medium">{leave.leaveType}</p>
              </div>
              <div className="flex space-x-3 mb-2">
                <p className="text-lg font-bold">Reason:</p>
                <p className="font-medium">{leave.reason}</p>
              </div>
              <div className="flex space-x-3 mb-2">
                <p className="text-lg font-bold">Department:</p>
                <p className="font-medium">
                  {leave.employeeId.department.dept_name}
                </p>
              </div>
              <div className="flex space-x-3 mb-2">
                <p className="text-lg font-bold">Designation:</p>
                <p className="font-medium">{leave.employeeId.designation}</p>
              </div>
              <div className="flex space-x-3 mb-2">
                <p className="text-lg font-bold">Start Date:</p>
                <p className="font-medium">
                  {new Date(leave.startDate).toLocaleDateString()}
                </p>
              </div>
              <div className="flex space-x-3 mb-2">
                <p className="text-lg font-bold">End Date:</p>
                <p className="font-medium">
                  {new Date(leave.endDate).toLocaleDateString()}
                </p>
              </div>
              <div className="flex space-x-2">
                <p className="text-lg font-bold">
                  {leave.status === "Pending" ? "Action: " : "Status:"}
                </p>
                {leave.status === "Pending" ? (
                  <div className="flex space-x-2">
                    <button className="px-2  py-0.5 bg-teal-300 hover:bg-teal-400" onClick={()=>changeStatus(leave._id,"Approved")}>Approve</button>
                    <button className="px-2 py-0.5 bg-red-300 hover:bg-red-400" onClick={()=>changeStatus(leave._id,"Rejected")}>Reject</button>
                  </div>
                ) : (
                  <p className="font-medium">{leave.status}</p>
                )}
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
