import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

export const AttendanceReport = () => {
  const [report, setReport] = useState({});
  const [limit, setLimit] = useState(5);
  const [skip, setSkip] = useState(0);
  const [dateFilter, setDateFilter] = useState();
  const [loading, setLoading] = useState(false);

  const apiUrl = import.meta.env.VITE_CONN_URL;

  const fetchReport = async () => {
    try {
      setLoading(true);
      const query = new URLSearchParams({ limit, skip });
      if (dateFilter) {
        query.append("date", dateFilter);
      }
      const res = await axios.get(
        `${apiUrl}/api/attendance/report?${query.toString()}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("Attendance Report data", res.data);
      if (res.data.success) {
        if (skip == 0) {
          setReport(res.data.groupData);
        } else {
          setReport((prevData) => ({ ...report, ...res.data.groupData }));
        }
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      // if (error.response && !error.response.data.success) {
      //   console.log(error.response.data.message);
      // }
    }
  };

  useEffect(() => {
    fetchReport();
  }, [skip,dateFilter]);

  const handleLoadMore=()=>{
    setSkip((prevSkip)=>prevSkip+limit);
  }
  return (
    <div className="min-h-screen p-10 bg-white">
      <h2 className="text-center text-2xl font-bold">Attendance Report</h2>
      <div>
        <h2 className="text-xl font-semibold">Filter by Date</h2>
        <input type="date" className="border bg-gray-100" onChange={(e)=>{
            setDateFilter(e.target.value);
            setSkip(0);
        }} />
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        Object.entries(report).map(([date, record]) => {
          return (
            <div key={date} className="mt-4 border-b">
              <h2 className="text-xl font-semibold">{date}</h2>
              <table border={1} cellPadding={10}>
                <thead className="bg-teal-700 text-white">
                  <tr>
                    <th>S No</th>
                    <th>Employee ID</th>
                    <th>Name</th>
                    <th>Department</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {record.map((data, index) => {
                    return (
                      <tr key={data.employeeId}>
                        <td>{index + 1}</td>
                        <td>{data.employeeId}</td>
                        <td>{data.employeeName}</td>
                        <td>{data.departmentName}</td>
                        <td>{data.status}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          );
        })
      )}
      <button className="px-4 py-2 border bg-gray-100 text-lg font-semibold" onClick={handleLoadMore}>Load More</button>
    </div>
  );
};
