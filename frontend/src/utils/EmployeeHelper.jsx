import axios from "axios";
import { useNavigate } from "react-router-dom";


export const columns = [
  {
    name: "SR No",
    selector: (row) => row.sno,
    width:"70px"
  },
  {
    name: "Name",
    selector: (row) => row.name,
    sortable:true,
    width:"150px",
  },
  {
    name: "Image",
    selector: (row) => row.profileImage,
    width:"120px"
  },
  {
    name: "Department",
    selector: (row) => row.dept_name,
    width:"170px"
  },
  {
    name: "DOB",
    selector: (row) => row.dob,
    sortable:true,
    width:"250px",
  },
  {
    name: "Action",
    selector: (row) => row.action,
    $center:"true",
  },
];

const apiUrl = import.meta.env.VITE_CONN_URL;

// Fetch the department form
export const fetchDepartments = async () => {
  let departments;
  try {
    const res = await axios.get(`${apiUrl}/api/department/get`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    // console.log(res.data.departments);
    if (res.data.success) {
      departments = res.data.departments;
    }
  } catch (error) {
    // console.log(error);
    if (error.response && !error.response.data.success) {
      console.log(error.response.data.message);
    }
  }
  return departments;
};


// Fetch the employee salary form
export const getEmployees = async (id) => {
  let employees;
  try {
    const res = await axios.get(`${apiUrl}/api/employee/department/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    // console.log(res.data.departments);
    if (res.data.success) {
      employees = res.data.employees;
    }
  } catch (error) {
    console.log(error);
    // if (error.response && !error.response.data.success) {
    //   console.log(error.response.data.message);
    // }
  }
  return employees;
};


export const EmployeeButtons = ({ id }) => {
  const navigate = useNavigate();
  return (
    <div className="flex space-x-3 ">
      <button
        className="px-4 py-1 bg-teal-600 text-white rounded hover:bg-teal-400"
        onClick={() => {
          navigate(`/admin-dashboard/employees/${id}`);
        }}
      >
        View
      </button>
      <button className="px-4 py-1 bg-blue-600 text-white rounded hover:bg-red-400" onClick={()=>{
        navigate(`/admin-dashboard/employees/edit/${id}`)
      }}>
        Edit
      </button>
      <button className="px-4 py-1 bg-yellow-600 text-white rounded hover:bg-red-400" onClick={()=>{
        navigate(`/admin-dashboard/employees/salary/${id}`)
      }}>
        Salary
      </button>
      <button className="px-4 py-1 bg-red-600 text-white rounded hover:bg-red-400" onClick={()=>navigate(`/admin-dashboard/employees/leaves/${id}`)}>
        Leave
      </button>
    </div>
  );
};
