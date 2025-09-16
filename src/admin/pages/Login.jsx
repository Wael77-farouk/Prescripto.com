import React, { useContext, useState } from "react";
import { AdminContext } from "../../context/AdminContext";
import axios from "axios";
import { toast } from "react-toastify";
import { DoctorContext } from "../../context/DoctorContext";

const Login = () => {
  const [state, setState] = useState("Admin");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const {setAToken,backendUrl} = useContext(AdminContext) // For Admin
  const {setDToken} = useContext(DoctorContext) // For Doctor
  

  const onSubmitHandler = async (event) =>{
  event.preventDefault()

  try {
    if(state === 'Admin') {
      const {data} = await axios.post(backendUrl + '/api/admin/login', {email, password})
      if (data.success) {
        localStorage.setItem('aToken', data.token) 
        setAToken(data.token)
      } else {
        toast.error(data.message)
      }
    } else  {
      const {data} = await axios.post(backendUrl + '/api/doctor/login', {email, password})
      if (data.success) {
        localStorage.setItem('dToken', data.token) 
        setDToken(data.token)
      } else {
        toast.error(data.message)
      }
    }
  } catch (error) {
    toast.error("An error occurred during login.");
  }
}


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
          <span className="text-blue-600">{state}</span> Login
        </h2>

        <form onSubmit={onSubmitHandler} className="space-y-5">
          {/* Email */}
        <div>
            <label className="block text-gray-600 font-medium mb-2">Email</label>
            <input onChange={(e)=>setEmail(e.target.value)} value={email} type="email" required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Enter your email"/>
            </div>

          {/* Password */}
        <div>
            <label className="block text-gray-600 font-medium mb-2">Password</label>
            <input onChange={(e)=>setPassword(e.target.value)} value={password} type="password" required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Enter your password"/>
            </div>

          {/* Button */}
          <button type="submit" className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200"
         >Login</button>
        { state === "Admin" 
        ? <p>Doctor Login? <span className="text-primary underline cursor-pointer" onClick={()=>setState('Doctor')}>Click here</span></p>
        : <p>Admin Login? <span className="text-primary underline cursor-pointer" onClick={()=>setState('Admin')}>Click here</span></p>
      }

        </form>
      </div>
    </div>
  );
};

export default Login;
