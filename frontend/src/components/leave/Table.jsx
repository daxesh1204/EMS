import axios from "axios";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { columns, LeaveButtons } from "../../utils/LeaveHelper";

export const Table = () => {
  const apiUrl = import.meta.env.VITE_CONN_URL;
  const [leaves, setLeaves] = useState(null);
  const [filteredLeaves, setFilteredLeaves] = useState(null);

  const fetchLeaves = async () => {
    try {
      const res = await axios.get(`${apiUrl}/api/leave`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log("Get Employees", res.data);

      if (res.data.success) {
        let sno = 1;
        const data = await res.data.leaves.map((leave) => ({
          _id: leave._id,
          sno: sno++,
          employeeId: leave.employeeId.employeeId,
          name: leave.employeeId.userId.name,
          leaveType: leave.leaveType,
          department: leave.employeeId.department.dept_name,
          days:
            new Date(leave.endDate).getDate() -
            new Date(leave.startDate).getDate(),
          status: leave.status,
          action: <LeaveButtons Id={leave._id} />,
        }));
        setLeaves(data);
        setFilteredLeaves(data);
      }
    } catch (error) {
      console.log(error);
      // if (error.response && !error.response.data.success) {
      //   console.log(error.response.data.message);
      // }
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  const filterByInput = (e) => {
    const data = leaves.filter((leaves) =>
      leaves.employeeId.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredLeaves(data);
  };

  const filterByButton = (status) => {
    const data = leaves.filter((leave) => {
      return leave.status.toLowerCase().includes(status.toLowerCase());
    });
    setFilteredLeaves(data);
  };
  return (
    <>
      {filteredLeaves ? (
        <div className="p-6">
          <div className="text-center">
            <h3 className="text-2xl font-bold">Manage Leaves</h3>
          </div>
          <div className="flex justify-between items-center">
            <input
              type="text"
              placeholder="Search By Emp Id"
              className="px-4  py-0.5 border"
              onChange={filterByInput}
            />

            <div className="space-x-3">
              <button
                className="px-2 py-1 bg-teal-600 text-white hover:bg-teal-700"
                onClick={() => filterByButton("Pending")}
              >
                Pending
              </button>
              <button
                className="px-2 py-1 bg-teal-600 text-white hover:bg-teal-700"
                onClick={() => filterByButton("Approved")}
              >
                Approved
              </button>
              <button
                className="px-2 py-1 bg-teal-600 text-white hover:bg-teal-700"
                onClick={() => filterByButton("Rejected")}
              >
                Rejected
              </button>
            </div>
          </div>

          <div className="mt-5">
            <DataTable columns={columns} data={filteredLeaves} pagination />
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};
