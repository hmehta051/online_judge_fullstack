import React from "react";
import { useLogoutUserMutation } from "../redux/slices/apiSlice";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

const Navbar = () => {
  const [logoutUser] = useLogoutUserMutation();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await logoutUser().unwrap();
      navigate('/login'); // Redirect to login page
    } catch (err) {
      toast.error("Logout failed: ", err)
      console.error("Logout failed: ", err);
    }
  };

  return (
    <div className="w-full h-full shadow-lg p-4 flex items-center justify-between">
      <img src="https://ik.imagekit.io/bksgfrlfg/logo_daad_dAnA.png?updatedAt=1716035561396" alt="CodeKing Logo" width={200} height={200} className="w-[150px] md:w-[200px] sm:w-[150px]" />
      {
        Cookies.get('token') && <button onClick={handleLogout} className="px-6 py-2 font-semibold text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
          Logout
        </button>
      }

    </div>
  );
};

export default Navbar;
