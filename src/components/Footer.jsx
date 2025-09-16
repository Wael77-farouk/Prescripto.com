import React from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'
import { FaFacebook, FaLinkedin, FaInstagram, FaWhatsapp, FaEnvelope, FaPhone } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="bg-gray-100 text-gray-700 py-10 px-6 md:px-16">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

        {/* ----- Left Section ----- */}
        <div>
          <img src={assets.logo} alt="logo" className="mb-4 w-32" />
          <p>
            Our mission is to provide affordable and reliable healthcare
            services to everyone, everywhere.
          </p>
        </div>

        {/* ----- Center Section ----- */}
        <div>
          <p className="font-semibold mb-3">COMPANY</p>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="hover:text-blue-500 transition-colors duration-300">Home</Link>
            </li>

            <li>
              <Link to="/about" className="hover:text-blue-500 transition-colors duration-300">About Us</Link>
            </li>
      
            <li><Link to="/contact" className="hover:text-blue-500 transition-colors duration-300">Contact</Link>
            </li>

            <li>
              <Link to="/privacy-policy" className="hover:text-blue-500 transition-colors duration-300">Privacy Policy</Link>
            </li>

          </ul>
        </div>

        {/* ----- Right Section ----- */}
        <div>
          <p className="font-semibold mb-3">GET IN TOUCH</p>
          <ul className="space-y-3 text-gray-600">
            <li className="flex items-center gap-3 hover:text-blue-500 transition-colors duration-300">
              <FaEnvelope className="text-lg" />
              <a href="mailto:waelfarouk1142001@gmail.com">waelfarouk1142001@gmail.com</a>
            </li>
            <li className="flex items-center gap-3 hover:text-green-600 transition-colors duration-300">
              <FaPhone className="text-lg" />
              <a href="tel:+201203965665">+20 120 396 5665</a>
            </li>
          </ul>

          {/* Social Media Icons */}
          <div className="flex gap-4 mt-4 text-2xl text-gray-600">
            <a
              href="https://www.facebook.com/your-profile"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-600 transition-colors duration-300"
            >
              <FaFacebook />
            </a>
            <a
              href="https://www.linkedin.com/in/your-profile"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-700 transition-colors duration-300"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://www.instagram.com/your-profile"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-pink-500 transition-colors duration-300"
            >
              <FaInstagram />
            </a>
            <a
              href="https://wa.me/201203965665" 
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-green-500 transition-colors duration-300"
            >
              <FaWhatsapp />
            </a>
          </div>
        </div>
      </div>

      {/* ------ Copyright Text ------ */}
      <div className="text-center mt-10 border-t pt-6 text-sm text-gray-500">
        <p>Copyright © 2025 Prescripto. All rights reserved.</p>
        <p>Developed by <span className="font-semibold">Wael Farouk</span></p>
      </div>
    </div>
  )
}

export default Footer
