import React from 'react'
import logo from "../assets/logo.png";
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
function AdminDashboard() {
    const navigate = useNavigate()
     const handleLogout = async () => {
    try {
      const response = await axios.get(`https://course-sphere.onrender.com/admin/logout`, {
        withCredentials: true,
      });
  if (response?.data?.message) {
      toast.success(response.data.message);
    } else {
      toast.success("Logged out successfully");
    }      localStorage.removeItem("admin");
      navigate("/admin/login")
    } catch (error) {
      console.log("Error in logging out ", error);
      toast.error(error?.response?.data?.errors || "Error in logging out");
    }
  };
  return (
    <div className='flex'>
        <div className='w-1/3 p-6 bg-zinc-800 h-screen'>
        <div className="flex items-center flex-col mb-10">
          <img src={logo} alt="Profile" className="rounded-full h-20 w-20" />
          <h2 className="text-lg text-zinc-400 font-semibold mt-4">I'm Admin</h2>
        </div>
        <nav className="flex flex-col space-y-4">
          <Link to="/admin/our-courses">
            <button className="w-full bg-green-700 hover:bg-green-600 text-white py-2 rounded">
              Our Courses
            </button>
          </Link>
          <Link to="/admin/create-course">
            <button className="w-full bg-orange-500 hover:bg-blue-600 text-white py-2 rounded">
              Create Course
            </button>
          </Link>

          <Link to="/">
            <button className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded">
              Home
            </button>
          </Link>
          <Link >
            <button
            onClick={handleLogout}
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded"
            >
              Logout
            </button>
          </Link>
        </nav></div>
        <div className='flex h-screen items-center justify-center w-full text-2xl text-zinc-400 bg-zinc-600'>Welcome</div>
    </div>
  )
}

export default AdminDashboard