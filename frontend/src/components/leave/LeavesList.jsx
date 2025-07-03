import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../../../context/authContext";

export const LeavesList = () => {
  const [leaves, setLeaves] = useState([]);
  const apiUrl = import.meta.env.VITE_CONN_URL;
  let sno = 1;
  const { id } = useParams();
  const { user } = useAuth();

  const fetchLeaves = async () => {
    try {
      const res = await axios.get(`${apiUrl}/api/leave/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      // console.log("API Response:", res.data);
      if (res.data.success) {
        setLeaves(res.data.leaves);
        // setFilteredSalaries(res.data.salary);
      }
    } catch (error) {
      console.log(error.message);
      if (error.response && !error.response.data.success) {
        console.log(error.response.data.error);
      }
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, []);
  return (
    <div className="p-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold">Manage Leaves</h3>
      </div>
      <div className="flex justify-between items-center">
        <input
          type="text"
          placeholder="Search By Dept Name"
          className="px-4  py-0.5 border"
        />

        {user.role === "employee" && (
          <Link
            to="/employee-dashboard/add-leave"
            className="px-4 py-1 bg-teal-600 rounded text-white"
          >
            Add New Leave
          </Link>
        )}
      </div>

      <table className="w-full text-sm text-left mt-6">
        <thead className="text-xs  bg-teal-600 uppercase border border-gray-200 text-white">
          <tr>
            <th className="px-6 py-3">SNO</th>
            <th className="px-6 py-3">Leave Type</th>
            <th className="px-6 py-3">From</th>
            <th className="px-6 py-3">To</th>
            <th className="px-6 py-3">Description</th>
            <th className="px-6 py-3">Status</th>
          </tr>
        </thead>
        <tbody>
          {leaves.map((leave) => {
            return (
              <tr
                key={leave._id}
                className="bg-white border-b text-gray-700 dark:border-gray-700"
              >
                <td className="px-6 py-3">{sno++}</td>
                <td className="px-6 py-3">{leave.leaveType}</td>
                <td className="px-6 py-3">
                  {new Date(leave.startDate).toLocaleDateString()}
                </td>
                <td className="px-6 py-3">
                  {new Date(leave.endDate).toLocaleDateString()}
                </td>
                <td className="px-6 py-3">{leave.reason}</td>
                <td className="px-6 py-3">{leave.status}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
