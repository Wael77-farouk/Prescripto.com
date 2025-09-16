import React, { useState,useContext } from 'react'
import { assets } from '../assets/assets'
import { NavLink, useNavigate } from 'react-router-dom'
import { AppContext } from "../context/AppContext";

const Navbar = () => {
  const navigate = useNavigate()
  const [showMenu, setShowMenu] = useState(false)
  const {token,setToken,userData} = useContext(AppContext)

  const logout = () => {
    setToken(false)
    localStorage.removeItem('token')
  }

  return (
    <div className="flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400">
      {/* Logo */}
      <img onClick={() => navigate('/')} className="w-44 cursor-pointer" src={assets.logo} alt="logo" />

      {/* Desktop Menu */}
      <ul className="hidden md:flex gap-5 font-medium items-start">
        <NavLink to="/">
        <li className="py-1">HOME</li>
        <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
        </NavLink>
        <NavLink to="/doctors">
        <li className="py-1">ALL DOCTORS</li>
        <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
        </NavLink>
        <NavLink to="/about">
        <li className="py-1">ABOUT</li>
        <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
        </NavLink>
        <NavLink to="/contact">
        <li className="py-1">CONTACT</li>
        <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
        </NavLink>
      </ul>

      {/* Right Side */}
      <div className="flex items-center gap-4">
        {token && userData ? (
          <div className="flex items-center gap-2 cursor-pointer group relative">
            <img className="w-8 rounded-full" src={userData.image} alt="profile" />
            <img className="w-2.5" src={assets.dropdown_icon} alt="dropdown" />
            <div className="absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block">
              <div className="min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4">
                <p onClick={() => navigate('/my-profile')} className="hover:text-black cursor-pointer">My Profile</p>
                <p onClick={() => navigate('/my-appointments')} className="hover:text-black cursor-pointer">My Appointments</p>
                <p onClick={logout} className="hover:text-black cursor-pointer">Logout</p>
              </div>
            </div>
          </div>
        ) : (
          <button onClick={() => navigate('/login')} className="bg-primary text-white px-8 py-3 rounded-full font-light hidden md:block">Create account</button>
        )}

        {/* Mobile Menu Icon */}
        <img onClick={() => setShowMenu(true)} className="w-6 md:hidden cursor-pointer" src={assets.menu_icon} alt="menu" />
      </div>

      {/*------ Mobile Menu ------*/}
      <div className={`fixed top-0 left-0 h-full w-3/4 sm:w-1/2 bg-white z-50 p-6 shadow-lg transform transition-transform duration-300 ease-in-out 
        ${showMenu ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex items-center justify-between mb-8">
          <img src={assets.logo} alt="logo" className="h-10" />
          <img onClick={() => setShowMenu(false)} src={assets.cross_icon} alt="close" className="h-6 w-6 cursor-pointer hover:scale-110 transition" />
        </div>
        <ul className="flex flex-col space-y-6 text-lg font-medium text-gray-700">
          <li><NavLink to="/" onClick={() => setShowMenu(false)} className="hover:text-blue-600 transition">HOME</NavLink></li>
          <li><NavLink to="/doctors" onClick={() => setShowMenu(false)} className="hover:text-blue-600 transition">ALL DOCTORS</NavLink></li>
          <li><NavLink to="/about" onClick={() => setShowMenu(false)} className="hover:text-blue-600 transition">ABOUT</NavLink></li>
          <li><NavLink to="/contact" onClick={() => setShowMenu(false)} className="hover:text-blue-600 transition">CONTACT</NavLink></li>
        </ul>
      </div>
    </div>
  )
}

export default Navbar
