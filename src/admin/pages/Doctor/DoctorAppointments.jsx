import React, { useContext, useEffect, useState } from 'react';
import { DoctorContext } from '../../../context/DoctorContext';
import { AppContext } from '../../../context/AppContext';

const DoctorAppointments = () => {
  const { 
    dToken, 
    appointments, 
    getAppointments, 
    cancellationAppointment, 
    completeAppointment 
  } = useContext(DoctorContext);

  const { calculateAge, slotDateFormat, currency } = useContext(AppContext);

  const [localAppointments, setLocalAppointments] = useState([]);

  useEffect(() => {
    if (dToken) getAppointments();
  }, [dToken]);

  useEffect(() => {
    if (appointments) {
      // إنشاء نسخة معكوسة بدون تعديل الأصل
      setLocalAppointments([...appointments].reverse());
    }
  }, [appointments]);

  // عند الموافقة
  const handleComplete = async (id) => {
    try {
      // تحديث الواجهة فورًا
      setLocalAppointments(prev =>
        prev.map(item => 
          item._id === id 
            ? { ...item, approved: true, cancelled: false } 
            : item
        )
      );
      // إرسال الطلب للسيرفر
      await completeAppointment(id);
    } catch (error) {
      console.error('Error completing appointment:', error);
      // في حالة خطأ، إرجاع الحالة الأصلية
      await getAppointments();
    }
  };

  // عند الإلغاء
  const handleCancel = async (id) => {
    try {
      setLocalAppointments(prev =>
        prev.map(item => 
          item._id === id 
            ? { ...item, cancelled: true, approved: false } 
            : item
        )
      );
      await cancellationAppointment(id);
    } catch (error) {
      console.error('Error canceling appointment:', error);
      // في حالة خطأ، إرجاع الحالة الأصلية
      await getAppointments();
    }
  };

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
              <th className="py-3 px-4">Payment</th>
              <th className="py-3 px-4">Fees</th>
              <th className="py-3 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {localAppointments && localAppointments.length > 0 ? (
              localAppointments.map((item, index) => (
                <tr key={item._id} className="border-b last:border-0 hover:bg-gray-50 transition-colors">
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

                  {/* Payment */}
                  <td className="py-3 px-4">
                    {item.payment ? (
                      <span className="text-green-600 font-semibold bg-green-50 px-2 py-1 rounded-full text-xs">
                        Online
                      </span>
                    ) : (
                      <span className="text-gray-600 font-semibold bg-gray-50 px-2 py-1 rounded-full text-xs">
                        CASH
                      </span>
                    )}
                  </td>

                  {/* Fees */}
                  <td className="py-3 px-4 font-semibold text-gray-800">
                    {currency}{item.amount}
                  </td>

                  {/* Actions */}
                  <td className="py-3 px-4 text-center">
                    {item.cancelled ? (
                      <span className="text-red-500 font-semibold bg-red-50 px-3 py-1 rounded-full text-xs">
                        Cancelled
                      </span>
                    ) : item.isCompleted ? (
                      <span className="text-blue-500 font-semibold bg-blue-50 px-3 py-1 rounded-full text-xs">
                        ✓ Completed
                      </span>
                    ) : item.approved ? (
                      <div className="flex justify-center gap-2">
                        {/* Call Button */}
                        <a
                          href={`tel:${item.userData.phone}`}
                          className="bg-green-500 text-white px-3 py-1 rounded-md text-xs hover:bg-green-600 transition-colors"
                          title="Call Patient"
                        >
                          📞 Call
                        </a>

                        {/* WhatsApp Button */}
                        <a
                          href={`https://wa.me/20${item.userData.phone}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-green-600 text-white px-3 py-1 rounded-md text-xs hover:bg-green-700 transition-colors"
                          title="WhatsApp Patient"
                        >
                          💬 WhatsApp
                        </a>

                        {/* Complete Button */}
                        <button
                          onClick={() => {
                            setLocalAppointments(prev =>
                              prev.map(appointment => 
                                appointment._id === item._id 
                                  ? { ...appointment, isCompleted: true } 
                                  : appointment
                              )
                            );
                            completeAppointment(item._id);
                          }}
                          className="bg-blue-500 text-white px-3 py-1 rounded-md text-xs hover:bg-blue-600 transition-colors"
                          title="Mark as Completed"
                        >
                          ✓ Complete
                        </button>
                      </div>
                    ) : (
                      <div className="flex justify-center gap-2">
                        {/* Approve Button */}
                        <button
                          onClick={() => handleComplete(item._id)}
                          className="bg-green-500 text-white px-3 py-1 rounded-md text-xs hover:bg-green-600 transition-colors"
                          title="Approve Appointment"
                        >
                          ✓ Approve
                        </button>

                        {/* Cancel Button */}
                        <button
                          onClick={() => handleCancel(item._id)}
                          className="bg-red-500 text-white px-3 py-1 rounded-md text-xs hover:bg-red-600 transition-colors"
                          title="Cancel Appointment"
                        >
                          ✗ Cancel
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

export default DoctorAppointments;