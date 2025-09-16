import React,{useState,useContext} from "react";
import { assets } from "../../assets/assets";
import {AdminContext} from '../../../context/AdminContext'
import {toast} from 'react-toastify'
import axios from 'axios'
const AddDoctor = () => {

    const [docImg, setDocImg] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [experience, setExperience] = useState('1 Year');
    const [fees, setFees] = useState('');
    const [about, setAbout] = useState('');
    const [speciality, setSpeciality] = useState('General physician');
    const [degree, setDegree] = useState('');
    const [address1, setAddress1] = useState('');
    const [address2, setAddress2] = useState('');

    const { backendUrl , aToken } = useContext(AdminContext)
    const onSubmitHandler = async (event) => {
        event.preventDefault()

        try {
            if(!docImg) {
               return toast.error('Image Not Selected')
            }

            const formData = new FormData()

            formData.append('image', docImg);
            formData.append('name', name);
            formData.append('email', email);
            formData.append('password', password);
            formData.append('experience', experience);
            formData.append('fees', Number(fees));
            formData.append('about', about);
            formData.append('speciality', speciality);
            formData.append('degree', degree);
            formData.append('address', JSON.stringify({line1: address1, line2: address2}));
            
            // console log formData
            formData.forEach((value,key)=>{
                console.log(`${key} : ${value}`)
            })

            const {data} = await axios.post(backendUrl + '/api/admin/add-doctor', formData, { headers: { aToken }}) 
            
            if (data.success) {
                toast.success(data.message)
                setDocImg(false)
                setName('')
                setPassword('')
                setEmail('')
                setAddress1('')
                setAddress2('')
                setDegree('')
                setAbout('')
                setFees('')
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <form onSubmit={onSubmitHandler} className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-4xl">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Add Doctor</h2>

        {/* Upload Image */}
   <div className="flex flex-col items-center mb-6">
    <label htmlFor="doc-img" className={`w-28 h-28 flex items-center justify-center ${docImg ? "" : "border-2 border-dashed border-gray-300"} rounded-full cursor-pointer hover:bg-gray-100 transition overflow-hidden`}>
     <img src={docImg ? URL.createObjectURL(docImg) : assets.upload_area} alt="" className={`${docImg ? "object-cover w-full h-full" : "w-10 opacity-70"} rounded-full`} />
   </label>
   <input onChange={(e) => setDocImg(e.target.files[0])} type="file" id="doc-img" hidden />
     <p className="text-sm text-gray-500 mt-2 text-center">Upload doctor <br /> picture</p>
      </div>

        {/* Grid Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div><label className="block text-gray-600 mb-2">Doctor Name</label><input onChange={(e) => setName(e.target.value)} value={name} type="text" placeholder="Name" required className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:outline-none" /></div>
          <div><label className="block text-gray-600 mb-2">Doctor Email</label><input onChange={(e) => setEmail(e.target.value)} value={email} type="email" placeholder="Email" required className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:outline-none" /></div>
          <div><label className="block text-gray-600 mb-2">Doctor Password</label><input onChange={(e) => setPassword(e.target.value)} value={password} type="password" placeholder="Password" required className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:outline-none" /></div>
          <div><label className="block text-gray-600 mb-2">Experience</label><select onChange={(e) => setExperience(e.target.value)} value={experience} className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:outline-none" required>
            {Array.from({ length: 10 }, (_, i) => (<option key={i} value={`${i + 1} Year`}>{i + 1} Year</option>))}</select></div>
          <div><label className="block text-gray-600 mb-2">Fees</label><input onChange={(e) => setFees(e.target.value)} value={fees} type="number" placeholder="Fees" required className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:outline-none" /></div>
          <div><label className="block text-gray-600 mb-2">Speciality</label><select onChange={(e) => setSpeciality(e.target.value)} value={speciality} className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:outline-none" required>
            <option value="General physician">General physician</option>
            <option value="Gynecologist">Gynecologist</option>
            <option value="Dermatologist">Dermatologist</option>
            <option value="Pediatricians">Pediatricians</option>
            <option value="Neurologist">Neurologist</option>
            <option value="Gastroenterologist">Gastroenterologist</option>
          </select></div>
          <div><label className="block text-gray-600 mb-2">Education</label><input onChange={(e) => setDegree(e.target.value)} value={degree} type="text" placeholder="Education" required className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:outline-none" /></div>
          <div><label className="block text-gray-600 mb-2">Address</label>
            <input onChange={(e) => setAddress1(e.target.value)} value={address1} type="text" placeholder="Address 1" required className="w-full mb-3 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:outline-none" />
            <input onChange={(e) => setAddress2(e.target.value)} value={address2} type="text" placeholder="Address 2" required className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:outline-none" />
          </div>
        </div>

        {/* About */}
        <div className="mt-6">
          <label className="block text-gray-600 mb-2">About Doctor</label>
          <textarea onChange={(e) => setAbout(e.target.value)} value={about} placeholder="Write about doctor" rows={4} required className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:outline-none"></textarea>
        </div>

        {/* Submit */}
        <div className="mt-8 flex justify-end">
          <button type="submit" className="bg-primary hover:bg-green-600 text-white px-6 py-3 rounded-2xl shadow-md transition font-medium">Add Doctor</button>
        </div>
      </form>
    </div>
  );
};

export default AddDoctor;
