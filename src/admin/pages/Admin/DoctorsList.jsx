import React, { useContext, useEffect } from 'react';
import { AdminContext } from '../../../context/AdminContext';

const DoctorsList = () => {
  const { doctors, aToken, getAllDoctors, changeAvailability } = useContext(AdminContext);

  useEffect(() => {
    if (aToken) {
      getAllDoctors();
    }
  }, [aToken]);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">All Doctors</h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {doctors.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-md hover:shadow-2xl hover:scale-105 transition transform duration-300 p-5 flex flex-col items-center cursor-pointer"
          >
            <img
              src={item.image}
              alt=""
              className="w-32 h-32 object-cover rounded-full border-4 border-green-500 mb-4"
            />
            <div className="text-center">
              <p className="text-lg font-semibold text-gray-800">{item.name}</p>
              <p className="text-sm text-gray-500">{item.speciality}</p>
              <div className="mt-3 flex items-center justify-center gap-2">
                <input onChange={() => changeAvailability(item._id)}
                  type="checkbox"
                  checked={item.available}
                  className="w-3 h-3 accent-green-600 cursor-pointer"
                  readOnly
                />
                <p
                  className={`text-sm font-medium ${
                    item.available ? 'text-green-600' : 'text-red-500'
                  }`}
                >
                  {item.available ? 'Available' : 'Unavailable'}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorsList;
