import { FaUser } from "react-icons/fa";
import { useAuth } from "../../../context/authContext";
export const Summary = () => {
  const { user } = useAuth();
  return (
    <div className="p-6">
      <div className="rounded flex bg-slate-200 shadow-md">
        <div
          className={`text-3xl flex justify-center items-start text-white px-4 py-4  bg-teal-600`}
        >
          <FaUser />
        </div>
        <div className="pl-4 py-1">
          <p className="text-lg font-semibold">Wecome Back</p>
          <p className="text-xl font-bold">{user.name}</p>
        </div>
      </div>
    </div>
  );
};
