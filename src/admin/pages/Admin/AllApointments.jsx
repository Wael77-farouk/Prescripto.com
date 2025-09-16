import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../../context/AdminContext";
import { AppContext } from "../../../context/AppContext";

const AllAppointments = () => {
  const { aToken, appointments, getAllAppointments, cancelAppointment } =
    useContext(AdminContext);
  const { calculateAge, slotDateFormat, currency } = useContext(AppContext);

  useEffect(() => {
    if (aToken) {
      getAllAppointments();
    }
  }, [aToken]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        All Appointments
      </h2>

      <div className="overflow-x-auto bg-white rounded-2xl shadow-lg border border-gray-200">
        <table className="w-full text-sm text-gray-700">
          <thead className="bg-blue-600 text-white text-left text-sm uppercase tracking-wide">
            <tr>
              <th className="py-3 px-4">#</th>
              <th className="py-3 px-4">Patient</th>
              <th className="py-3 px-4">Age</th>
              <th className="py-3 px-4">Date & Time</th>
              <th className="py-3 px-4">Doctor</th>
              <th className="py-3 px-4">Fees</th>
              <th className="py-3 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments && appointments.length > 0 ? (
              appointments.map((item, index) => (
                <tr
                  key={item._id}
                  className="border-b last:border-0 hover:bg-gray-50 transition-colors"
                >
                  {/* Index */}
                  <td className="py-3 px-4">{index + 1}</td>

                  {/* Patient */}
                  <td className="py-3 px-4 flex items-center gap-2">
                    <img
                      className="w-8 h-8 rounded-full object-cover"
                      src={item.userData.image}
                      alt={item.userData.name}
                    />
                    <span>{item.userData.name}</span>
                  </td>

                  {/* Age */}
                  <td className="py-3 px-4">
                    {calculateAge(item.userData.dob)}
                  </td>

                  {/* Date & Time */}
                  <td className="py-3 px-4">
                    {slotDateFormat(item.slotDate)}, {item.slotTime}
                  </td>

                  {/* Doctor */}
                  <td className="py-3 px-4 flex items-center gap-2">
                    <img
                      className="w-8 h-8 rounded-full object-cover"
                      src={item.docData.image}
                      alt={item.docData.name}
                    />
                    <span>{item.docData.name}</span>
                  </td>

                  {/* Fees */}
                  <td className="py-3 px-4 font-semibold text-gray-800">
                    {currency}
                    {item.amount}
                  </td>
                  {/* Action */}
                  <td className="py-3 px-4 text-center">
                    {item.cancelled ? (
                      <p className="text-red-500 font-semibold">Cancelled</p>
                    ) : item.approved ? (
                      <p className="text-green-500 font-semibold">Approved</p>
                    ) : (
                      <div className="flex justify-center gap-2">
                        {/* زرار Call */}
                        <a
                          href={`tel:${item.userData.phone}`}
                          className="bg-green-500 text-white px-3 py-1 rounded-md text-xs hover:bg-green-600"
                        >
                          Call
                        </a>

                        {/* زرار WhatsApp */}
                        <a
                          href={`https://wa.me/20${item.userData.phone}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-green-600 text-white px-3 py-1 rounded-md text-xs hover:bg-green-700"
                        >
                          WhatsApp
                        </a>

                        {/* زرار Cancel */}
                        <button
                          onClick={() => cancelAppointment(item._id)}
                          className="bg-red-500 text-white px-3 py-1 rounded-md text-xs hover:bg-red-600"
                        >
                          Cancel
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-6 text-gray-500">
                  No appointments available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllAppointments;
