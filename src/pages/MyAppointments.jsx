import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const MyAppointments = () => {
  const { backendUrl, token, getDoctorsData } = useContext(AppContext);
  const [appointments, setAppointments] = useState([]);

  const months = [
    "",
    " January",
    " February",
    " March",
    " April",
    " May",
    " June",
    " July",
    " August",
    " September",
    " October",
    " November",
    " December",
  ];

  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split("_");
    return dateArray[0] + "" + months[Number(dateArray[1])] + " " + dateArray[2];
  };

  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/user/appointments", {
        headers: { token },
      });

      if (data.success) {
        setAppointments(data.appointments.reverse());
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/user/cancel-appointments",
        { appointmentId },
        { headers: { token } }
      );
      if (data.success) {
        toast.success(data.message);
        getUserAppointments();
        getDoctorsData(); // تحديث بيانات الدكاترة بعد إلغاء الموعد
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const handlePayment = (doctorName) => {
    // 1) إشعار قبل التحويل
    toast.info(`💳 من فضلك ادفع على الرقم 0120396566 من خلال فودافون كاش`, {
      autoClose: 8000,
    });

    // 2) بعد ثانيتين يفتح واتساب
    setTimeout(() => {
      const phone = "20120396566"; // رقم واتساب (لازم يكون بدون صفر في الأول)
      const message = `مرحبًا، أريد دفع الكشف للدكتور ${doctorName}.`;
      const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
      window.open(url, "_blank");
    },3000);
  };

  useEffect(() => {
    if (token) {
      getUserAppointments();
    }
  }, [token]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">My Appointments</h2>

      <div className="grid md:grid-cols-2 gap-6">
        {appointments.map((item, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-2xl p-5 flex flex-col items-center text-center hover:shadow-xl transition"
          >
            {/* صورة الدكتور */}
            <div className="w-24 h-24 mb-4">
              <img
                src={item.docData.image}
                alt={item.name}
                className="w-full h-full rounded-full object-cover border-4 border-blue-500 shadow-md"
              />
            </div>

            {/* بيانات الدكتور */}
            <p className="text-lg font-semibold text-gray-800">
              {item.docData.name}
            </p>
            <p className="text-blue-600 text-sm mb-2">
              {item.docData.speciality}
            </p>

            {/* العنوان */}
            <p className="text-gray-500 text-sm">{item.docData.address.line1}</p>
            <p className="text-gray-500 text-sm">{item.docData.address.line2}</p>

            {/* التاريخ والوقت */}
            <div className="mt-3 text-sm text-gray-700">
              <span className="font-semibold">Date & Time:</span>{" "}
              <span className="text-gray-600">
                {slotDateFormat(item.slotDate)} | {item.slotTime}
              </span>
            </div>

            {/* الأزرار */}
            <div className="flex flex-wrap gap-3 mt-5">
              {!item.cancelled && item.payment && (
                <button className="px-4 py-2 bg-gray-500 text-white rounded-lg shadow cursor-not-allowed">
                  Payment Done
                </button>
              )}

              {!item.cancelled && !item.payment && (
                <button
                  onClick={() => handlePayment(item.docData.name)}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition"
                >
                  💳 Pay Online
                </button>
              )}

              {!item.cancelled && (
                <button
                  onClick={() => cancelAppointment(item._id)}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition"
                >
                  Cancel Appointment
                </button>
              )}

              {item.cancelled && (
                <button className="sm:min-w-48 py-2 border border-red-500 rounded text-red-500">
                  Appointment Cancelled
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAppointments;
