import React, { useState,useContext } from "react";
import { AppContext } from "../context/AppContext";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaVenusMars, FaBirthdayCake } from "react-icons/fa";
import {assets} from '../assets/assets'
import axios from "axios";
import { toast } from "react-toastify";

const MyProfile = () => {
  const { userData,setUserData, token, backendUrl, loadUserProfileData } = useContext(AppContext);

  const [isEdit, setIsEdit] = useState(false);
  const [image,setImage] = useState(false);

  const updateUserProfileData = async () => {
  try {
    const formData = new FormData()

    formData.append('name', userData.name)
    formData.append('phone', userData.phone)
    formData.append('address', JSON.stringify(userData.address))
    formData.append('gender', userData.gender)
    formData.append('dob', userData.dob)

    image && formData.append('image', image)

    const { data } = await axios.post(backendUrl + '/api/user/update-profile', formData, { headers: { token } })

    if (data.success) {    
      toast.success(data.message)
      await loadUserProfileData()
      setIsEdit(false)
      setImage(false)
      } else {
        toast.error(data.message)
      }

      } catch (error) {
        console.log(error)
        toast.error(error.message)
      }
    }

  return userData && (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-2xl">
      {/* صورة البروفايل + الاسم */}
<div className="flex flex-col items-center text-center">
  <div className="inline-block relative cursor-pointer">
    {isEdit ? (
      <label htmlFor="image">
        <img
          className="w-32 h-32 rounded-full border-4 border-blue-500 shadow-md object-cover opacity-75"
          src={image ? URL.createObjectURL(image) : userData.image}
          alt="Profile"
        />
        {!image && (
          <img
            className="w-10 absolute bottom-12 right-12"
            src={assets.upload_area}
            alt="Upload Icon"
          />
        )}
        <input
          type="file"
          id="image"
          hidden
          onChange={(e) => setImage(e.target.files[0])}
        />
      </label>
    ) : (
      <img
        className="w-32 h-32 rounded-full border-4 border-blue-500 shadow-md object-cover"
        src={userData.image}
        alt="Profile"
      />
    )}
  </div>

  {isEdit ? (
    <input
      type="text"
      value={userData.name}
      onChange={(e) =>
        setUserData((prev) => ({ ...prev, name: e.target.value }))
      }
      className="mt-4 text-xl font-semibold border px-3 py-2 rounded-lg w-60 text-center"
    />
  ) : (
    <h2 className="mt-4 text-2xl font-bold text-gray-800">
      {userData.name}
    </h2>
  )}
</div>


      <hr className="my-6" />

      {/* Contact Info */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-3">
          CONTACT INFORMATION
        </h3>
        <div className="space-y-3 text-gray-600">
          {/* Email */}
          <p className="flex items-center gap-2">
            <FaEnvelope className="text-blue-600" />
            <span className="font-medium">Email:</span> {userData.email}
          </p>

          {/* Phone */}
          <p className="flex items-center gap-2">
            <FaPhoneAlt className="text-green-600" />
            <span className="font-medium">Phone:</span>
            {isEdit ? (
              <input
                type="text"
                value={userData.phone}
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, phone: e.target.value }))
                }
                className="ml-2 border px-2 py-1 rounded-lg"
              />
            ) : (
              userData.phone
            )}
          </p>

          {/* Address */}
          <div className="flex items-start gap-2">
            <FaMapMarkerAlt className="text-red-600 mt-1" />
            <div>
              <p className="font-medium">Address:</p>
              {isEdit ? (
                <div className="space-y-2">
                  <input
                    type="text"
                    value={userData.address.line1}
                    onChange={(e) =>
                      setUserData((prev) => ({
                        ...prev,
                        address: { ...prev.address, line1: e.target.value },
                      }))
                    }
                    className="w-full border px-2 py-1 rounded-lg"
                  />
                  <input
                    type="text"
                    value={userData.address.line2}
                    onChange={(e) =>
                      setUserData((prev) => ({
                        ...prev,
                        address: { ...prev.address, line2: e.target.value },
                      }))
                    }
                    className="w-full border px-2 py-1 rounded-lg"
                  />
                </div>
              ) : (
                <p>
                  {userData.address.line1} <br /> {userData.address.line2}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Basic Info */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-3">
          BASIC INFORMATION
        </h3>
        <div className="space-y-3 text-gray-600">
          {/* Gender */}
          <p className="flex items-center gap-2">
            <FaVenusMars className="text-pink-500" />
            <span className="font-medium">Gender:</span>
            {isEdit ? (
              <select
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, gender: e.target.value }))
                }
                value={userData.gender}
                className="border px-3 py-2 rounded-lg"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            ) : (
              userData.gender
            )}
          </p>

          {/* Birthday */}
          <p className="flex items-center gap-2">
            <FaBirthdayCake className="text-orange-500" />
            <span className="font-medium">Birthday:</span>
            {isEdit ? (
              <input
                type="date"
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, dob: e.target.value }))
                }
                value={userData.dob}
                className="border px-3 py-2 rounded-lg"
              />
            ) : (
              userData.dob
            )}
          </p>
        </div>
      </div>

      {/* زرار Edit/Save */}
      <div className="flex justify-center">
        {isEdit ? (
          <button
            onClick={updateUserProfileData}
            className="bg-green-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-green-700 transition"
          >
            Save Information
          </button>
        ) : (
          <button
            onClick={() => setIsEdit(true)}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition"
          >
            Edit
          </button>
        )}
      </div>
    </div>
  );
};

export default MyProfile;
