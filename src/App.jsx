import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// ========== FRONTEND IMPORTS ==========
import Home from "./pages/Home";
import Doctors from "./pages/Doctors";
import Login from "./pages/Login";
import About from "./pages/About";
import Contact from "./pages/Contact";
import MyProfile from "./pages/MyProfile";
import MyAppointments from "./pages/MyAppointments";
import Appointment from "./pages/Appointment";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// ========== ADMIN IMPORTS ==========
import { AdminContext } from "./context/AdminContext";
import { DoctorContext } from "./context/DoctorContext";
import AdminLogin from "./admin/pages/Login"; // login admin
import AdminNavbar from "./admin/components/Navbar";
import Sidebar from "./admin/components/Sidebar";
import Dashboard from "./admin/pages/Admin/Dashboard";
import AllApointments from "./admin/pages/Admin/AllApointments";
import AddDoctor from "./admin/pages/Admin/AddDoctor";
import DoctorsList from "./admin/pages/Admin/DoctorsList";
import DoctorDashboard from "./admin/pages/Doctor/DoctorDashboard";
import DoctorAppointments from "./admin/pages/Doctor/DoctorAppointments";
import DoctorProfile from "./admin/pages/Doctor/DoctorProfile";

const App = () => {
  const { aToken } = useContext(AdminContext);
  const { dToken } = useContext(DoctorContext);

  return (
    <div className="mx-4 sm:mx-[10%]">
      <ToastContainer />

      <Routes>
        {/* ========== FRONTEND ROUTES ========== */}
        <Route
          path="/*"
          element={
            <>
              <Navbar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/doctors" element={<Doctors />} />
                <Route path="/doctors/:speciality" element={<Doctors />} />
                <Route path="/login" element={<Login />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/my-profile" element={<MyProfile />} />
                <Route path="/my-appointments" element={<MyAppointments />} />
                <Route
                  path="/appointment/:docId"
                  element={<Appointment />}
                />
              </Routes>
              <Footer />
            </>
          }
        />

        {/* ========== ADMIN ROUTES ========== */}
        <Route
          path="/admin/*"
          element={
            aToken || dToken ? (
              <div className="bg-[#F8F9FD] flex">
                <Sidebar />
                <div className="flex-1">
                  <AdminNavbar />
                  <Routes>
                    {/* Admin */}
                    <Route path="admin-dashboard" element={<Dashboard />} />
                    <Route
                      path="all-appointments"
                      element={<AllApointments />}
                    />
                    <Route path="add-doctor" element={<AddDoctor />} />
                    <Route path="doctor-list" element={<DoctorsList />} />

                    {/* Doctor */}
                    <Route
                      path="doctor-dashboard"
                      element={<DoctorDashboard />}
                    />
                    <Route
                      path="doctor-appointments"
                      element={<DoctorAppointments />}
                    />
                    <Route path="doctor-profile" element={<DoctorProfile />} />
                  </Routes>
                </div>
              </div>
            ) : (
              <AdminLogin />
            )
          }
        />
      </Routes>
    </div>
  );
};

export default App;
