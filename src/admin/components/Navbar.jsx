import React, { useContext } from "react";
import { assets } from "../assets/assets";
import {useNavigate} from 'react-router-dom'
import { AdminContext } from "../../context/AdminContext";
import { DoctorContext } from "../../context/DoctorContext";

const Navbar = () => {
  const { aToken,setAToken } = useContext(AdminContext);
  const {dToken,setDToken} = useContext(DoctorContext)
  const navigate = useNavigate()
  const logout = () => {
    navigate('/')
    aToken && setAToken('')
    aToken && localStorage.removeItem('dToken') 
    dToken && setDToken('')
    dToken && localStorage.removeItem('dToken') 
  }

  return (
    <div className="flex justify-between itens-center px-4 sm:px-10 py-3 border-b bg-white">
      {/* Logo + Role */}
      <div className="flex items-center space-x-3">
        <img src={assets.admin_logo} alt="Logo" className="w-36 sm:w-40 cursor-pointer"/>
         <p className="text-lg font-semibold text-gray-700">
          {aToken ? "Admin" : "Doctor"}</p>
        </div>
        {/* Logout Button */}
      <button onClick={logout}
        className="bg-primary hover:bg-red-600 text-white font-medium px-4 py-2 rounded-2xl transition duration-200">
       Logout </button>
       </div>
  );
};

export default Navbar;
