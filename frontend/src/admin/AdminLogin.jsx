import React, { useState } from "react";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
function AdminLogin() {
  const navigate = useNavigate();
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log({
      email,
      password,
    });
    try {
      const res = await axios.post(
        "https://course-sphere.onrender.com/api/v1/admin/login",
        {
          email,
          password,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("AdminLogin Successful successful", res.data);
      const notify = () =>
        toast.success("Login Successful", {
          position: "top-center",
        });
      notify();
      console.log(res.data.message, "Login Successful");
      localStorage.setItem("admin",JSON.stringify(res.data));
      navigate("/admin/dashboard");
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.errors || "Signup Failed!!");
      }
    }
  };
  return (
    <div>
      <div className="text-white bg-gradient-to-r from-zinc-950 to-blue-950 min-h-screen w-full px-[10vw]">
        <div className=" flex md:justify-between w-full bg-transparent py-6 items-center">
          <div className="hidden md:flex items-center gap-2 ">
            <img className="w-10" src={logo} alt="" />
            <span className="text-orange-500 text-2xl font-semibold">
              CourseSphere
            </span>
          </div>
          <div className="flex md:justify-end w-full justify-center gap-4">
            <Link
              to="/admin/signup"
              className="border border-white rounded-md px-4 py-2 hover:bg-white hover:translate-y-1 transition-all duration-200 hover:text-black"
            >
              Signup
            </Link>
            <Link
              to="/"
              className="border border-white rounded-md px-4 py-2  hover:bg-white hover:translate-y-1 transition-all duration-200 hover:text-black"
            >
              Join Now
            </Link>
          </div>
        </div>{" "}
        <section className="bg-gray-900 w-7/9 md:w-1/2 relative md:mt-16 mt-10 mx-auto rounded-lg items-center flex justify-center flex-col">
          <h2 className="text-2xl mt-6 font-bold mb-4">
            Welcome to <span className="text-orange-500">CourseSphere</span>
          </h2>
          <p className="text-zinc-500 mb-6">Login to access admin dashboard!</p>
          <form onSubmit={handleSubmit}>
            <div className="mb-4 w-full flex flex-col">
              <label
                htmlFor="email"
                className="text-gray-400 mb-2 ouline-none "
              >
                Email
              </label>
              <input
                required
                onChange={(e) => {
                  setemail(e.target.value);
                }}
                type="text"
                id="email"
                className="w-full p-3 rounded-md outline-none border border-zinc-500 bg-transparent"
                value={email}
                placeholder="Type your Email"
              />
            </div>
            <div className="mb-4 flex flex-col">
              <label
                htmlFor="password"
                className="text-gray-400 mb-2 ouline-none "
              >
                Password
              </label>
              <input
                required
                onChange={(e) => {
                  setpassword(e.target.value);
                }}
                type="password"
                id="password"
                className="w-full p-3 rounded-md outline-none border border-zinc-500 bg-transparent"
                value={password}
                placeholder="Type your Password"
              />
            </div>
            {errorMessage && (
              <div className="text-center text-red-600 mb-4">
                {errorMessage}
              </div>
            )}
            <button
              type="submit"
              className="w-full bg-orange-600 text-white py-3 px-6 rounded-md mb-4 transition"
            >
              Login
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}

export default AdminLogin;
