import axios from "axios";
import {  useState } from "react";
import { useAuth } from "../../context/authContext";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error,setError]=useState(null);
  const {login}=useAuth();
  const navigate=useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });
      // console.log(res);
      if(res.data.success){
        // alert("Successfully login");
        login(res.data.user);
        // console.log(res.data.user);
        localStorage.setItem("token",res.data.token);
        if(res.data.user.role==="admin"){
          navigate('/admin-dashboard');
        }
        else{
          navigate("/employee-dashboard")
        }
      }
    } catch (error) {
         if(error.response && !error.response.data.success){
          setError(error.response.data.error)
         }else{
          setError("Server Error");
         }
    }
  };
  return (
    <div className="flex flex-col items-center h-screen justify-center bg-gradient-to-b from-teal-600 from-50% to-gray-100 space-y-6">
      <h2 className="text-3xl text-white">Employee Management System</h2>
      <div className="border shadow p-6 w-80 bg-white">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
         {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">
              Email<span className="text-red-600">*</span>
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-3  py-2 border"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700">
              Password<span className="text-red-600">*</span>
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full px-3  py-2 border"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-4 flex items-center justify-between">
            <label className="inline-flex items-center">
              <input type="checkbox" className="form-checkbox" />
              <span className="ml-2 text-gray-700">Remember me</span>
            </label>
            <a href="#" className="text-teal-600">
              Forgot password?
            </a>
          </div>
          <div className="mb-4">
            <button className="w-full bg-teal-600 text-white py-2">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
