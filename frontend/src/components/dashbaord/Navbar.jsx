import { useAuth } from "../../../context/authContext"

export const Navbar=()=>{
  const {user,logout}=useAuth();
  return(
    <div className="flex justify-between h-12 bg-teal-600 items-center text-white px-5">
      <p>Wecome {user.name}</p>
      <button className="px-4 py-1 bg-teal-700 hover:bg-teal-800" onClick={logout}>Logout</button>
    </div>
  )
}