import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import RelatedDoctors from "../components/RelatedDoctors";
import {toast} from 'react-toastify'
import axios from "axios";

const Appointment = () => {
  const { docId } = useParams();
  const { doctors, currencySymbol, backendUrl, token, getDoctorsData } = useContext(AppContext);
  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  
  const navigate = useNavigate()

  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");

  const fetchDocInfo = async () => {
    const docInfo = doctors.find((doc) => doc._id === docId);
    setDocInfo(docInfo);
  };

  const getAvailableSlots = async () => {
    setDocSlots([]);
    let today = new Date();

    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      let endTime = new Date();
      endTime.setDate(today.getDate() + i);
      endTime.setHours(21, 0, 0, 0);

      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10);
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }

      let timeSlots = [];
      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });
        
        //علشان لو حد حجز ميعاد ميظهرش تاني في الاختيار
        let day = currentDate.getDate();
        let month = currentDate.getMonth() + 1;
        let year = currentDate.getFullYear();

        const slotDate = day + "_" + month + "_" + year;
        const slotTime = formattedTime

        const isSlotAvailable = docInfo.slots_booked[slotDate] && docInfo.slots_booked[slotDate].includes(slotTime) ? false : true

        if(isSlotAvailable) {
          //add slot to array
          timeSlots.push({
          datetime: new Date(currentDate),
          time: formattedTime,
        });
        }

        //increment by 30 mins

        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }
      setDocSlots((prev) => [...prev, timeSlots]);
    }
  };

  const bookAppointment = async () => {
    if(!token) {
      toast.warn('Login to book appointment')
      return navigate('/login')
    }
    try {
      const date = docSlots[slotIndex][0].datetime;

      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();

      const slotDate = day + "_" + month + "_" + year;

      const { data } = await axios.post(backendUrl + '/api/user/book-appointment', {docId,slotDate, slotTime}, {headers:{token}})
      if(data.success) {
        toast.success(data.message)
        getDoctorsData()
        navigate('/my-appointments')
      } else{
        toast.error(data.message)
      }

    } catch (error) {
      toast.error(error.message)
    }
  }


  useEffect(() => {
    fetchDocInfo();
  }, [doctors, docId]);

  useEffect(() => {
    getAvailableSlots();
  }, [docInfo]);

  return (
    docInfo && (
      <div className="w-full p-6 bg-gray-50 min-h-screen">
        {/* -------- Doctor Details -------- */}
        <div className="flex flex-col md:flex-row gap-6 bg-white shadow-lg rounded-2xl p-6">
          {/* Doctor Image */}
          <div className="flex-shrink-0 flex justify-center">
            <img
              src={docInfo.image}
              alt={docInfo.name}
              className="w-40 h-40 object-cover rounded-full border-4 border-blue-500"
            />
          </div>

          {/* Doctor Info */}
          <div className="flex flex-col justify-center space-y-4 w-full">
            <p className="text-2xl font-semibold flex items-center gap-2 text-gray-900">
              {docInfo.name}
              <img src={assets.verified_icon} alt="verified" className="w-5 h-5" />
            </p>

            <div className="text-gray-600">
              <p className="text-lg">
                {docInfo.degree} -{" "}
                <span className="font-medium">{docInfo.speciality}</span>
              </p>
              <span className="mt-2 inline-block px-4 py-1 bg-blue-100 text-blue-600 rounded-full text-sm shadow-sm">
                {docInfo.experience}  experience
              </span>
            </div>

            <div className="pt-3 border-t">
              <p className="font-semibold flex items-center gap-2 text-gray-700">
                About <img src={assets.info_icon} alt="info" className="w-4 h-4" />
              </p>
              <p className="text-gray-600 mt-1">{docInfo.about}</p>
            </div>

            <div className="pt-3 border-t">
              <p className="font-semibold text-gray-700">Appointment Fees</p>
              <p className="text-green-600 text-lg font-bold">
                {currencySymbol}
                {docInfo.fees}
              </p>
            </div>
          </div>
        </div>

        {/* -------- Booking Slots -------- */}
        <div className="mt-8 bg-white shadow-md rounded-2xl p-6">
          <p className="text-xl font-semibold text-gray-800 mb-4">Booking Slots</p>

          {/* Days */}
          <div className="flex gap-3 overflow-x-auto pb-2">
            {docSlots.length > 0 &&
              docSlots.map((item, index) => (
                <button
                  key={index}
                  onClick={() => setSlotIndex(index)}
                  className={`flex flex-col items-center px-4 py-2 rounded-xl border transition 
                    ${
                      slotIndex === index
                        ? "bg-blue-600 text-white border-blue-600"
                        : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-blue-50"
                    }`}
                >
                  <span className="font-bold">{item[0] && daysOfWeek[item[0].datetime.getDay()]}</span>
                  <span className="text-sm">{item[0] && item[0].datetime.getDate()}</span>
                </button>
              ))}
          </div>

          {/* Times */}
          <div className="flex flex-wrap gap-3 mt-6">
            {docSlots.length > 0 &&
              docSlots[slotIndex].map((item, index) => (
                <button
                  key={index}
                  onClick={() => setSlotTime(item.time)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium border transition 
                    ${
                      slotTime === item.time
                        ? "bg-blue-600 text-white border-blue-600"
                        : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-blue-50"
                    }`}
                >
                  {item.time.toLowerCase()}
                </button>
              ))}
          </div>

          {/* Booking Button */}
          <div className="mt-6">
            <button onClick={bookAppointment} className="w-full md:w-auto px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl shadow-md hover:bg-blue-700 transition">
              Book an Appointment
            </button>
          </div>
        </div>
        
          {/* Related Doctors */} 
        <RelatedDoctors docId={docId} speciality={docInfo.speciality}/>
        
      </div>
    )
  );
};

export default Appointment;
