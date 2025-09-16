import React, { useContext, useEffect } from "react";
import { DoctorContext } from "../../../context/DoctorContext";
import { assets } from "../../assets/assets";
import { AppContext } from "../../../context/AppContext";

const DoctorDashboard = () => {
  const { dToken, getDashData, cancellationAppointment, dashData } =useContext(DoctorContext);
  const { slotDateFormat } = useContext(AppContext);
  const {currency} = useContext(AppContext)

  useEffect(() => {
    if (dToken) {
      getDashData();
    }
  }, [dToken]);

  return (
    dashData && (
      <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-10">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Top Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Earnings */}
            <div className="flex items-center gap-4 bg-gradient-to-r from-green-400 to-green-600 text-white shadow-md rounded-2xl p-5 hover:shadow-lg hover:scale-[1.02] transition">
              <img src={assets.earning_icon} alt="" className="w-12 h-12" />
              <div>
                <p className="text-2xl font-bold">{dashData.earnings} {currency}</p>
                <p className="opacity-90">Earnings</p>
              </div>
            </div>

            {/* Appointments */}
            <div className="flex items-center gap-4 bg-gradient-to-r from-blue-400 to-blue-600 text-white shadow-md rounded-2xl p-5 hover:shadow-lg hover:scale-[1.02] transition">
              <img src={assets.appointments_icon} alt="" className="w-12 h-12" />
              <div>
                <p className="text-2xl font-bold">{dashData.appointments}</p>
                <p className="opacity-90">Appointments</p>
              </div>
            </div>

            {/* Patients */}
            <div className="flex items-center gap-4 bg-gradient-to-r from-purple-400 to-purple-600 text-white shadow-md rounded-2xl p-5 hover:shadow-lg hover:scale-[1.02] transition">
              <img src={assets.patients_icon} alt="" className="w-12 h-12" />
              <div>
                <p className="text-2xl font-bold">{dashData.patients}</p>
                <p className="opacity-90">Patients</p>
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
              {dashData.latestAppointments.map((item, index) => {
                let statusClass = "bg-yellow-100"; // Pending by default
                if (item.cancelled) statusClass = "bg-red-100";
                else if (item.approved) statusClass = "bg-green-100";

                return (
                  <div
                    key={index}
                    className={`flex flex-col sm:flex-row sm:items-center justify-between 
                                ${statusClass} p-4 rounded-xl shadow-sm
                                hover:scale-[1.02] hover:shadow-md 
                                transition-transform duration-200 ease-in-out`}
                  >
                    <div className="flex items-center gap-4 mb-3 sm:mb-0">
                      <img
                        src={item.userData.image}
                        alt=""
                        className="w-12 h-12 rounded-full border"
                      />
                      <div>
                        <p className="font-semibold text-gray-800">
                          {item.userData.name}
                        </p>
                        <p className="text-sm text-gray-500">
                          {slotDateFormat(item.slotDate)}
                        </p>
                      </div>
                    </div>

                    {item.cancelled ? (
                      <p className="text-red-500 font-medium text-sm sm:text-base">
                        Cancelled
                      </p>
                    ) : item.approved ? (
                      <p className="text-green-600 font-medium text-sm sm:text-base">
                        Approved
                      </p>
                    ) : (
                      <img
                        onClick={() => cancellationAppointment(item._id)}
                        src={assets.cancel_icon}
                        alt="Cancel"
                        className="w-6 h-6 cursor-pointer hover:scale-110 transition self-end sm:self-auto"
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default DoctorDashboard;
