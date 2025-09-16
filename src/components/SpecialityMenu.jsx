import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FaStethoscope, 
  FaFemale, 
  FaBaby, 
  FaBrain, 
  FaUserCircle 
} from 'react-icons/fa';
import { GiStomach } from 'react-icons/gi'; // أيقونة معدة

const specialityData = [
  { speciality: 'General physician', icon: <FaStethoscope />, color: 'from-purple-400 via-pink-400 to-red-400' },
  { speciality: 'Gynecologist', icon: <FaFemale />, color: 'from-red-400 via-pink-500 to-red-600' },
  { speciality: 'Dermatologist', icon: <FaUserCircle />, color: 'from-blue-400 via-indigo-400 to-purple-500' },
  { speciality: 'Pediatricians', icon: <FaBaby />, color: 'from-green-400 via-teal-400 to-blue-400' },
  { speciality: 'Neurologist', icon: <FaBrain />, color: 'from-yellow-400 via-orange-400 to-red-400' },
  { speciality: 'Gastroenterologist', icon: <GiStomach />, color: 'from-cyan-400 via-blue-400 to-indigo-500' },
];

const SpecialityMenu = () => {
  return (
    <section className="py-20 bg-gray-50" id="speciality">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-2">Find by Speciality</h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-10">
          Explore our trusted doctors by speciality and book your appointment easily.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {specialityData.map((item, index) => (
            <Link
              key={index}
              to={`/doctors/${item.speciality}`}
              onClick={() => window.scrollTo(0, 0)}
              className="group flex flex-col items-center bg-white p-4 rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500"
            >
              <div
                className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mb-3 text-white text-2xl sm:text-3xl bg-gradient-to-tr ${item.color} group-hover:scale-110 transition-transform duration-300`}
              >
                {item.icon}
              </div>
              <p className="text-gray-700 font-medium group-hover:text-purple-600 transition-colors duration-300 text-sm sm:text-base">
                {item.speciality}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SpecialityMenu;
