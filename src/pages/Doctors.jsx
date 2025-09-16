import React, { useContext, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { FaSearch } from 'react-icons/fa';

const Doctors = () => {
  const { speciality } = useParams();
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);

  const [filterDoc, setFilterDoc] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // قائمة التخصصات
  const specialities = [
    "General physician",
    "Gynecologist",
    "Dermatologist",
    "Pediatricians",
    "Neurologist",
    "Gastroenterologist",
  ];

  // تطبيق الفلتر على التخصص والبحث
  const applyFilter = () => {
    let filtered = doctors;

    if (speciality) {
      filtered = filtered.filter(doc => doc.speciality === speciality);
    }

    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(doc =>
        doc.name.toLowerCase().includes(q) ||
        doc.speciality.toLowerCase().includes(q)
      );
    }

    setFilterDoc(filtered);
  };

  useEffect(() => {
    applyFilter();
  }, [speciality, doctors, searchQuery]);

  return (
    <div className="px-6 py-10 bg-gray-50 min-h-screen">
      {/* عنوان */}
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Find Your Doctor
      </h1>

      {/* شريط البحث */}
      <div className="max-w-2xl mx-auto mb-8 relative">
        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search by name or speciality..."
          className="w-full py-3 pl-10 pr-4 rounded-full shadow focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* التخصصات بشكل أزرار عصرية */}
      <div className="flex flex-wrap justify-center gap-4 mb-10">
        {specialities.map((spec, i) => (
          <button
            key={i}
            onClick={() => navigate(`/doctors/${spec}`)}
            className={`px-5 py-2 rounded-full font-medium transition
              ${speciality === spec
                ? "bg-blue-600 text-white shadow-lg"
                : "bg-white text-blue-600 border border-blue-200 hover:bg-blue-100"
              }`}
          >
            {spec}
          </button>
        ))}
      </div>

      {/* قائمة الدكاترة */}
      {filterDoc.length > 0 ? (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filterDoc.map((doc, idx) => (
            <div
              key={idx}
              onClick={() => navigate(`/appointment/${doc._id}`)}
              className="bg-white rounded-xl shadow hover:shadow-xl transform hover:-translate-y-1 transition-all cursor-pointer overflow-hidden"
            >
              <div className="w-full h-48 bg-blue-50 flex items-center justify-center">
                <img
                  src={doc.image}
                  alt={doc.name}
                  className="h-full object-contain"
                />
              </div>
              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                  <span className="text-sm text-green-600">Available</span>
                </div>
                <h2 className="text-lg font-semibold text-gray-800">{doc.name}</h2>
                <p className="text-sm text-gray-500">{doc.speciality}</p>
                <button
                  onClick={() => navigate(`/appointment/${doc._id}`)}
                  className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  Book Appointment
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-10">No doctors found.</p>
      )}
    </div>
  );
};

export default Doctors;
