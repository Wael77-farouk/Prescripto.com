import React, { useContext, useEffect, useState } from "react";
import { DoctorContext } from "../../../context/DoctorContext";
import { AppContext } from "../../../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const DoctorProfile = () => {
  const { dToken, profileData, setProfileData, getProfileData, backendUrl } =
    useContext(DoctorContext);
  const { currency } = useContext(AppContext);
  const [isEdit, setIsEdit] = useState(false);

  const updateProfile = async () => {
    try {
      const updateData = {
        address: profileData.address,
        fees: profileData.fees,
        available: profileData.available,
      };

      const { data } = await axios.post(
        backendUrl + "/api/doctor/update-profile",
        updateData,
        {
          headers: {
            dToken,
          },
        }
      );

      if (data.success) {
        toast.success(data.message);
        setIsEdit(false);
        getProfileData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (dToken) {
      getProfileData();
    }
  }, [dToken]);

  return (
    profileData && (
      <div className="min-h-screen bg-gray-100 p-4 sm:p-6 md:p-10 flex justify-center">
        <div
          className={`bg-white rounded-2xl shadow-xl p-6 sm:p-8 md:p-10 space-y-6 transition-all duration-500
          ${isEdit ? "w-full max-w-6xl" : "w-full max-w-4xl"}`}
        >
          {/* Doctor Image */}
          <div className="flex justify-center">
            <img
              src={profileData.image}
              alt=""
              className="w-32 h-32 rounded-full object-cover border-4 border-blue-500 shadow-md"
            />
          </div>

          {/* --------- Doc Info : name, degree, experience ---------- */}
          <div className="text-center space-y-2">
            <p className="text-2xl font-bold text-gray-800">
              {profileData.name}
            </p>
            <p className="text-gray-600">
              {profileData.degree} - {profileData.speciality}
            </p>
            <button className="bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-sm font-medium">
              {profileData.experience} years experience
            </button>
          </div>

          {/* --------- Doc About ---------- */}
          <div className="bg-gray-50 p-4 rounded-xl border">
            <p className="text-lg font-semibold text-gray-800 mb-2">About</p>
            <p className="text-gray-600 leading-relaxed">
              {profileData.about}
            </p>
          </div>

          {/* Fees */}
          <p className="text-gray-700 text-lg font-medium">
            Appointment fee:{" "}
            <span className="text-blue-600 font-bold">
              {currency}
              {isEdit ? (
                <input
                  type="number"
                  onChange={(e) =>
                    setProfileData((prev) => ({ ...prev, fees: e.target.value }))
                  }
                  value={profileData.fees}
                  className="border px-2 py-1 rounded ml-2"
                />
              ) : (
                profileData.fees
              )}
            </span>
          </p>

          {/* Address */}
          <div className="bg-gray-50 p-4 rounded-xl border">
            <p className="text-lg font-semibold text-gray-800 mb-2">Address</p>
            <p className="text-gray-600">
              {isEdit ? (
                <input
                  type="text"
                  onChange={(e) =>
                    setProfileData((prev) => ({
                      ...prev,
                      address: { ...prev.address, line1: e.target.value },
                    }))
                  }
                  value={profileData.address.line1}
                  className="border px-2 py-1 rounded w-full"
                />
              ) : (
                profileData.address.line1
              )}
            </p>
            <p className="text-gray-600">
              {isEdit ? (
                <input
                  type="text"
                  onChange={(e) =>
                    setProfileData((prev) => ({
                      ...prev,
                      address: { ...prev.address, line2: e.target.value },
                    }))
                  }
                  value={profileData.address.line2}
                  className="border px-2 py-1 rounded w-full"
                />
              ) : (
                profileData.address.line2
              )}
            </p>
          </div>

          {/* Availability */}
          <div className="flex items-center gap-2">
            <input
              onChange={() =>
                isEdit &&
                setProfileData((prev) => ({
                  ...prev,
                  available: !prev.available,
                }))
              }
              checked={profileData.available}
              type="checkbox"
              id="available"
              className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="available" className="text-gray-700 font-medium">
              Available
            </label>
          </div>

          {/* Edit Button */}
          <div className="flex justify-end">
            {isEdit ? (
              <button
                onClick={updateProfile}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium shadow hover:bg-blue-700 transition"
              >
                Save
              </button>
            ) : (
              <button
                onClick={() => setIsEdit(true)}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium shadow hover:bg-blue-700 transition"
              >
                Edit
              </button>
            )}
          </div>
        </div>
      </div>
    )
  );
};

export default DoctorProfile;
