import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { NotFound } from "./NotFound";

export const ViewSalary = () => {
  const [salaries, setSalaries] = useState(null);
  const [filteredSalaries, setFilteredSalaries] = useState(null);
  const { id } = useParams();
  const apiUrl = import.meta.env.VITE_CONN_URL;
  let sno = 1;

  const fetchSalaries = async () => {
    try {
      const res = await axios.get(`${apiUrl}/api/salary/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      // console.log("API Response:", res.data);
      if (res.data.success) {
        setSalaries(res.data.salary);
        setFilteredSalaries(res.data.salary);
      }
    } catch (error) {
      console.log(error.message);
      if (error.response && !error.response.data.success) {
        console.log(error.response.data.error);
      }
    }
  };

  useEffect(() => {
    fetchSalaries();
  }, []);

  const searchSalaries = (e) => {
    const filterRecords = salaries.filter((leave) => {
      return leave.employeeId
        .toLocaleLowerCase()
        .includes(e.toLocaleLowerCase());
    });
    setFilteredSalaries(filterRecords);
  };
  return (
    <>
      {filteredSalaries === null ? (
        <div >
          <NotFound/>
        </div>
      ) : (
        <div className="overflow-x-auto p-5">
          <div className="text-center">
            <h2 className="text-2xl font-bold">Salary History</h2>
          </div>
          <div className="flex justify-end my-3">
            <input
              type="text"
              placeholder="Search By Emp Id"
              className="border px-2 rounded-md py-0.5 border-gray-300"
              onChange={searchSalaries}
            />
          </div>
          {filteredSalaries.length > 0 ? (
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs bg-teal-600 uppercase border text-white">
                <tr>
                  <th className="px-6 py-3">SNO</th>
                  <th className="px-6 py-3">Emp ID</th>
                  <th className="px-6 py-3">Salary</th>
                  <th className="px-6 py-3">Allowance</th>
                  <th className="px-6 py-3">Deduction</th>
                  <th className="px-6 py-3">Total</th>
                  <th className="px-6 py-3">Pay Date</th>
                </tr>
              </thead>
              <tbody>
                {filteredSalaries.map((salary) => {
                  return (
                    <tr
                      key={salary._id}
                      className="bg-white border-b text-gray-700 dark:border-gray-700"
                    >
                      <td className="px-6 py-3">{sno++}</td>
                      <td className="px-6 py-3">
                        {salary.employeeId.employeeId}
                      </td>
                      <td className="px-6 py-3">{salary.basicSalary}</td>
                      <td className="px-6 py-3">{salary.allowances}</td>
                      <td className="px-6 py-3">{salary.deductions}</td>
                      <td className="px-6 py-3">{salary.netSalary}</td>
                      <td className="px-6 py-3">
                        {new Date(salary.payDate).toLocaleDateString()}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <div>No Records Found!!</div>
          )}
        </div>
      )}
    </>
  );
};
