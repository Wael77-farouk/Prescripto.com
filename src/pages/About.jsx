import React from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { HeartPulse, Users, Stethoscope, Shield } from "lucide-react";

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full bg-gray-50">
      {/* Hero Section */}
      <div className="min-h-screen flex items-center justify-center px-6 py-16">
        <div className="max-w-6xl w-full grid md:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="relative">
            <img
              src={assets.about_image}
              alt="About us"
              className="w-full h-full rounded-2xl shadow-xl object-cover"
            />
            {/* Decorative shapes */}
            <div className="absolute -top-6 -left-6 w-24 h-24 rounded-full bg-blue-100 -z-10"></div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 rounded-full bg-blue-200 -z-10"></div>
          </div>

          {/* Text */}
          <div className="flex flex-col space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
              Who We Are
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Our medical platform connects patients with top doctors across all
              specialties. We aim to simplify the process of booking
              appointments and getting medical consultations online with ease.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              Whether you need a quick consultation or continuous follow-up with
              your doctor, everything is available in just a few clicks. We
              ensure your experience is smooth, secure, and reliable.
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => navigate("/doctors")}
                className="px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition"
              >
                Book Appointment
              </button>
              <button onClick={()=> navigate ('/contact')} className="px-6 py-3 border border-blue-600 text-blue-600 rounded-xl font-medium hover:bg-blue-50 transition">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="max-w-6xl mx-auto px-6 py-16 text-center space-y-8">
        <h3 className="text-2xl md:text-3xl font-bold text-gray-800">
          Our Mission & Vision
        </h3>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Our mission is to make healthcare more accessible and convenient for
          everyone. We envision a future where patients can seamlessly connect
          with trusted doctors anytime, anywhere.
        </p>
      </div>

      {/* Statistics */}
      <div className="bg-blue-50 py-16">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 text-center">
          <div className="flex flex-col items-center">
            <Users className="w-10 h-10 text-blue-600 mb-3" />
            <h4 className="text-2xl font-bold text-gray-800">500+</h4>
            <p className="text-gray-600">Doctors</p>
          </div>
          <div className="flex flex-col items-center">
            <HeartPulse className="w-10 h-10 text-blue-600 mb-3" />
            <h4 className="text-2xl font-bold text-gray-800">20K+</h4>
            <p className="text-gray-600">Patients Served</p>
          </div>
          <div className="flex flex-col items-center">
            <Stethoscope className="w-10 h-10 text-blue-600 mb-3" />
            <h4 className="text-2xl font-bold text-gray-800">10+</h4>
            <p className="text-gray-600">Specialties</p>
          </div>
        </div>
      </div>

      {/* Core Values */}
      <div className="max-w-6xl mx-auto px-6 py-16 text-center space-y-12">
        <h3 className="text-2xl md:text-3xl font-bold text-gray-800">
          Our Core Values
        </h3>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center space-y-4 p-6 bg-white rounded-2xl shadow hover:shadow-lg transition">
            <Shield className="w-10 h-10 text-blue-600" />
            <h4 className="text-xl font-semibold">Trust</h4>
            <p className="text-gray-600">
              We provide a secure and transparent platform where patients can
              trust every step of their healthcare journey.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-4 p-6 bg-white rounded-2xl shadow hover:shadow-lg transition">
            <HeartPulse className="w-10 h-10 text-blue-600" />
            <h4 className="text-xl font-semibold">Care</h4>
            <p className="text-gray-600">
              We believe in compassionate healthcare, putting patients' needs
              and comfort first.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-4 p-6 bg-white rounded-2xl shadow hover:shadow-lg transition">
            <Stethoscope className="w-10 h-10 text-blue-600" />
            <h4 className="text-xl font-semibold">Innovation</h4>
            <p className="text-gray-600">
              We embrace modern technology to make healthcare smarter, faster,
              and more accessible for everyone.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
