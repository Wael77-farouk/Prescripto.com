import React from 'react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  return (
    <section className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:items-center">
        
        {/* Left Content: Hero Text + Buttons + Trust */}
        <div className="flex flex-col gap-6">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight">
            Your Health, <br /> Our Priority
          </h1>

          <p className="text-gray-700 text-lg md:text-xl max-w-lg">
            Find trusted doctors, book appointments instantly, and manage your healthcare with ease. 
            Experience a smarter way to stay healthy.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <a
              href="#speciality"
              className="inline-flex items-center justify-center gap-2 bg-purple-600 text-white font-semibold px-6 py-3 rounded-full shadow-lg hover:scale-105 transition-transform duration-300"
            >
              Book Appointment
              <img src={assets.arrow_icon} alt="arrow" className="w-4 h-4" />
            </a>

            <button
              onClick={() => navigate('./doctors')}
              className="inline-flex items-center justify-center gap-2 text-purple-600 border border-purple-600 px-6 py-3 rounded-full hover:bg-purple-50 transition-colors duration-300"
            >
              Browse Doctors
            </button>
          </div>

          {/* Trust Indicators */}
          <div className="flex items-center gap-3 mt-6">
            <img src={assets.group_profiles} alt="profiles" className="w-28" />
            <p className="text-gray-500 text-sm md:text-base">
              Join over <strong>1,000+</strong> patients who trust our platform to manage their healthcare.
            </p>
          </div>
        </div>

        {/* Right Content: Image */}
        <div>
          <img
            src={assets.header2}
            className="rounded shadow-lg"
            alt="Health illustration"
          />
        </div>

      </div>
    </section>
  );
};

export default Header;
