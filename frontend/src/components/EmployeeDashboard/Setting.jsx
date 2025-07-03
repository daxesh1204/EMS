import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/authContext";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const Setting = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [setting, setSetting] = useState({
    userId: user._id,
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [error, setError] = useState(null);
  const apiUrl = import.meta.env.VITE_CONN_URL;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSetting({ ...setting, [name]: value });
  };

  const handleSubmit = async (e) => {
    console.log(setting);
    e.preventDefault();
    if (setting.newPassword !== setting.confirmPassword) {
      setError("Password is not matched");
    } else {
      try {
        const res = await axios.put(
          `${apiUrl}/api/setting/change-password`,
          setting,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (res.data.success) {
          toast.success("Password updated successfully");
          setSetting({
            userId: user._id,
            oldPassword: "",
            newPassword: "",
            confirmPassword: "",
          });
          setError("");
        }
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md w-96">
      <h2 className="text-2xl font-bold mb-6">Change Password</h2>
      <p className="text-red-500">{error}</p>
      <form onSubmit={handleSubmit}>
        {/*Old Password*/}
        <div>
          <label htmlFor="oldPassword">Old Password</label>
          <input
            type="password"
            name="oldPassword"
            placeholder="Old Password"
            onChange={handleChange}
            value={setting.oldPassword}
            className="mt-1 w-full p-2 border border-gray-300 rounded-md mb-3"
            required
          />
        </div>

        {/*New Password*/}
        <div>
          <label htmlFor="newPassword">New Password</label>
          <input
            type="password"
            name="newPassword"
            placeholder="New Password"
            onChange={handleChange}
            value={setting.newPassword}
            className="mt-1 w-full p-2 border border-gray-300 rounded-md  mb-3"
            required
          />
        </div>

        {/*Confirm Password*/}
        <div>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            placeholder="New Password"
            onChange={handleChange}
            value={setting.confirmPassword} 
            className="mt-1 w-full p-2 border border-gray-300 rounded-md  mb-3"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full mt-6 bg-teal-700 text-white font-bold py-2 px-4 rounded-md"
        >
          Change Password
        </button>
      </form>
    </div>
  );
};
