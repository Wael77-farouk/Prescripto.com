import React from "react";
import { assets } from "../assets/assets";
import {
  FaEnvelope,
  FaPhone,
  FaFacebook,
  FaLinkedin,
  FaInstagram,
  FaWhatsapp,
} from "react-icons/fa";

const Contact = () => {
  return (
    <div className="w-full bg-gray-50 flex flex-col items-center justify-center px-6 py-16">
      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-12 items-center">
        {/* Image */}
        <div className="relative">
          <img
            src={assets.contact_image}
            alt="Contact"
            className="w-full h-full rounded-2xl shadow-xl object-cover"
          />
          {/* Decorative shapes */}
          <div className="absolute -top-6 -left-6 w-24 h-24 rounded-full bg-blue-100 -z-10"></div>
          <div className="absolute -bottom-6 -right-6 w-32 h-32 rounded-full bg-blue-200 -z-10"></div>
        </div>

        {/* Contact Info */}
        <div className="flex flex-col space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            Get in Touch
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            We’re here to answer your questions and help you book your medical
            appointments with ease. Reach out to us anytime!
          </p>

          {/* Email & Phone */}
          <ul className="space-y-3 text-gray-600">
            <li className="flex items-center gap-3 hover:text-blue-500 transition-colors duration-300">
              <FaEnvelope className="text-lg" />
              <a href="mailto:waelfarouk1142001@gmail.com">
                waelfarouk1142001@gmail.com
              </a>
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

      {/* Map Section */}
      <div className="w-full max-w-6xl mt-16">
        <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Our Location
        </h3>
        <div className="w-full h-[400px] rounded-2xl overflow-hidden shadow-xl">
          <iframe
            title="Google Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3453.1265879951527!2d30.7307425!3d28.1098844!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14598835f2a6df75%3A0x43df7f20f0d5b4e0!2z2YXYrdmF2YjYqSDYp9mE2YLYp9ix2Kkg2KfZhNin2YTZhtmK2Kkg2KfZhNi62YrZhiDYp9mE2YLYp9ix2Kkg2KfZhNmF2YTZitmB!5e0!3m2!1sen!2seg!4v1696179000000!5m2!1sen!2seg"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Contact;
