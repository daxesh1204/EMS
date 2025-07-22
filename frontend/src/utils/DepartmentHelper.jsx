import axios from "axios";
import { useNavigate } from "react-router-dom";

export const customStyle={
  headRow:{
    style:{
      backgroundColor:'#14b8a6',
      color:'white',
      fontWeight:'bold',
      fontSize:"0.9rem"
    }
  }
}
export const columns = [
  {
    name: "SR No",
    selector: (row) => row.sno,
    width:"70px"
  },
  {
    name: "Department Name",
    selector: (row) => row.dept_name,
    sortable:true,
    width:"300px"
  },
  {
    name: "Description",
    selector: (row) => row.description,
    width:"33rem"
  },
  {
    name: "Action",
    selector: (row) => row.action,
  },
];

export const DepartmentButtons = ({ id, onDepartmentDelete }) => {
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_CONN_URL;

  const handleDelete = async (id) => {
    const confirm = window.confirm("Do you want to delete?");
    if (confirm) {
      try {
        const res = await axios.delete(`${apiUrl}/api/department/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        console.log("api response", res);
        // console.log("res.data.success type:", typeof res.data.success, "value:", res.data.success);
        if (res.data.success) {
          onDepartmentDelete();
          
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          console.log(error.response.data.message);
        }
      }
    }
  };

  return (
    <div className="flex space-x-3 ">
      <button
        className="px-4 py-1 bg-teal-600 text-white rounded hover:bg-teal-400"
        onClick={() => {
          navigate(`/admin-dashboard/department/${id}`);
        }}
      >
        Edit
      </button>
      <button
        className="px-4 py-1 bg-red-600 text-white rounded hover:bg-red-400"
        onClick={() => {
          handleDelete(id);
        }}
      >
        Delete
      </button>
    </div>
  );
};
