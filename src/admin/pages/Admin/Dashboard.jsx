import React, { useContext, useEffect, useState } from "react";
import { DoctorContext } from "../../../context/DoctorContext";
import { assets } from "../../assets/assets";
import { AppContext } from "../../../context/AppContext";

const Dashboard = () => {
  const {
    dToken,
    getDashData,
    cancellationAppointment,
    completeAppointment,
    dashData,
  } = useContext(DoctorContext);
  const { slotDateFormat } = useContext(AppContext);

  const [localDashAppointments, setLocalDashAppointments] = useState([]);

  useEffect(() => {
    if (dToken) {
      getDashData();
    }
  }, [dToken]);

  // نسخ البيانات محليًا
  useEffect(() => {
    if (dashData?.latestAppointments) {
      setLocalDashAppointments([...dashData.latestAppointments]);
    }
  }, [dashData]);

  // عند الموافقة (Approve)
  const handleApprove = async (id) => {
    setLocalDashAppointments(prev =>
      prev.map(item =>
        item._id === id ? { ...item, approved: true, cancelled: false } : item
      )
    );

    try {
      await completeAppointment(id); // لو عندك API للموافقة
      // بعد نجاح السيرفر، ممكن تحدث dashData إذا حبيت
      await getDashData();
    } catch (error) {
      console.error(error);
    }
  };

  // عند Complete
  const handleComplete = async (id) => {
    setLocalDashAppointments(prev =>
      prev.map(item =>
        item._id === id ? { ...item, isCompleted: true } : item
      )
    );

    try {
      await completeAppointment(id);
      await getDashData();
    } catch (error) {
      console.error(error);
    }
  };

  // عند الإلغاء
  const handleCancel = async (id) => {
    setLocalDashAppointments(prev =>
      prev.map(item =>
        item._id === id ? { ...item, cancelled: true, approved: false } : item
      )
    );

    try {
      await cancellationAppointment(id);
      await getDashData();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    localDashAppointments.length > 0 && (
      <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-10">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Top Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="flex items-center gap-4 bg-white shadow-md rounded-2xl p-5 hover:shadow-lg transition">
              <img src={assets.doctor_icon} alt="" className="w-12 h-12" />
              <div>
                <p className="text-2xl font-bold text-gray-800">
                  {dashData.doctors}
                </p>
                <p className="text-gray-500">Doctors</p>
              </div>
            </div>
            <div className="flex items-center gap-4 bg-white shadow-md rounded-2xl p-5 hover:shadow-lg transition">
              <img src={assets.appointments_icon} alt="" className="w-12 h-12" />
              <div>
                <p className="text-2xl font-bold text-gray-800">
                  {dashData.appointments}
                </p>
                <p className="text-gray-500">Appointments</p>
              </div>
            </div>
            <div className="flex items-center gap-4 bg-white shadow-md rounded-2xl p-5 hover:shadow-lg transition">
              <img src={assets.patients_icon} alt="" className="w-12 h-12" />
              <div>
                <p className="text-2xl font-bold text-gray-800">
                  {dashData.patients}
                </p>
                <p className="text-gray-500">Patients</p>
              </div>
            </div>
          </div>

          {/* Latest Bookings */}
          <div className="bg-white shadow-md rounded-2xl p-6">
            <div className="flex items-center gap-3 border-b pb-4 mb-6">
              <img src={assets.list_icon} alt="" className="w-6 h-6" />
              <p className="text-lg font-semibold text-gray-800">
                Latest Appointments
              </p>
            </div>

            <div className="space-y-4">
              {localDashAppointments.map((item) => (
                <div
                  key={item._id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between 
                             bg-gray-50 p-4 rounded-xl shadow-sm
                             hover:bg-gray-100 hover:scale-[1.02] hover:shadow-md 
                             transition-transform duration-200 ease-in-out"
                >
                  <div className="flex items-center gap-4 mb-3 sm:mb-0">
                    <img
                      src={item.docData.image}
                      alt=""
                      className="w-12 h-12 rounded-full border"
                    />
                    <div>
                      <p className="font-semibold text-gray-800">
                        {item.docData.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        {slotDateFormat(item.slotDate)}
                      </p>
                    </div>
                  </div>

                  {!item.cancelled ? (
                    item.isCompleted ? (
                      <p className="text-green-600 text-xs font-medium">Completed</p>
                    ) : item.approved ? (
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleComplete(item._id)}
                          className="bg-blue-500 text-white px-3 py-1 rounded-md text-xs hover:bg-blue-600"
                        >
                          ✓ Complete
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <img
                          src={assets.cancel_icon}
                          alt="Cancel"
                          className="w-10 cursor-pointer"
                          onClick={() => handleCancel(item._id)}
                        />
                        <img
                          src={assets.tick_icon}
                          alt="Approve"
                          className="w-10 cursor-pointer"
                          onClick={() => handleApprove(item._id)}
                        />
                      </div>
                    )
                  ) : (
                    <p className="text-red-500 text-xs font-medium">Cancelled</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default Dashboard;
