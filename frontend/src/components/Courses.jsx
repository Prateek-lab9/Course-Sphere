import axios from "axios";
import React, { useEffect, useState } from "react";
import logo from "../assets/logo.png";
import { Link, NavLink } from "react-router-dom";
function Courses() {
  const [courses, setCourses] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setloading] = useState(true);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("token"));
    const token = user?.token;
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await axios.get(
          "https://course-sphere.onrender.com/api/v1/course/courses",
          {
            withCredentials: true,
          }
        );
        console.log(data);
        let response = data.data;
        setCourses(response);
        setloading(false);
      } catch (error) {
        console.log("Error in fetching", error);
      }
    };
    fetchCourses();
  }, []);

  const handleLogout = async () => {
    try {
      const res = await axios.get("https://course-sphere.onrender.com/api/v1/user/logout", {
        withCredentials: true,
      });
      setIsLoggedIn(false);
      localStorage.removeItem("token");
      const notify = async () =>
        toast.success(await res.data.message, {
          position: "top-center",
        });
      notify();
    } catch (error) {
      const notify = async () =>
        toast.error("Error in Logging out", {
          position: "top-center",
        });
      notify();
    }
  };

  return (
    <div className="min-h-screen w-full flex">
      <div className="md:w-1/7 w-1/7 min-h-screen p-5 bg-zinc-800">
        <div className="flex items-center mb-10">
          <img src={logo} alt="" className="rounded-full w-12" />
        </div>
        <nav>
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex items-center  ${
                isActive ? "text-blue-500" : "text-zinc-500"
              }`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="#"
            className={({ isActive }) =>
              `flex items-center  ${
                isActive ? "text-blue-500" : "text-zinc-500"
              }`
            }
          >
            Courses
          </NavLink>
          <NavLink
            to="/purchases"
            className={({ isActive }) =>
              `flex items-center  ${
                isActive ? "text-blue-500" : "text-zinc-500"
              }`
            }
          >
            Purchases
          </NavLink>

          {isLoggedIn ? (
            <NavLink
              to="/"
              onClick={handleLogout}
              className={({ isActive }) =>
                `flex items-center  ${
                  isActive ? "text-blue-500" : "text-zinc-500"
                }`
              }
            >
              Logout
            </NavLink>
          ) : (
            <NavLink
              to="/login"
              className={({ isActive }) =>
                `flex items-center  ${
                  isActive ? "text-blue-500" : "text-zinc-500"
                }`
              }
            >
              Login
            </NavLink>
          )}
        </nav>
      </div>

      <div className="w-full bg-zinc-700 p-10">
        <header className="flex border-b pb-5 border-zinc-200 justify-between items-center mb-10">
          <h1 className="text-2xl text-zinc-300 font-semibold">Courses</h1>
          <div className="flex items-center gap-3">
            <div className="flex items-center">
              <input
                type="text"
                placeholder="Type here to search..."
                className=" border text-white rounded-l-md px-4 py-2 border-zinc-500 outline-none"
              />
              <button className="border text-white border-zinc-500 px-4 py-3 rounded-r-md flex items-center justify-center">
                <i className="fa-solid fa-magnifying-glass"></i>
              </button>
            </div>
            <div className="px-3.5 py-2  bg-zinc-800 rounded-full text-white">
              <i className="fa-solid fa-user"></i>
            </div>
          </div>
        </header>

        <div className=" h-3/4">
          {loading ? (
            <p className="text-center text-4xl text-zinc-400">Loading...</p>
          ) : courses.length === 0 ? (
            <p className="text-center text-4xl text-zinc-400">
              No courses yet posted by ADMIN
            </p>
          ) : (
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
              {courses.map((course) => (
                <div
                  key={course._id}
                  className="border border-zinc-200 rounded-lg p-4 shadow-stone-300"
                >
                  <div className="w-full h-40 md:h-72 overflow-hidden mb-4">
                    <img
                      src={course.image.url}
                      alt={course.title}
                      className="rounded object-cover w-full h-full "
                    />
                  </div>
                  <h2 className="font-bold text-white text-lg mb-2">
                    {course.title}
                  </h2>
                  <p className="mb-4 text-zinc-400">
                    {course.description.length > 100
                      ? `${course.description.slice(0, 100)}...`
                      : course.description}
                  </p>
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-bold text-xl">
                      $ {course.price}{" "}
                      <span className="text-zinc-500 line-through">5999</span>
                    </span>
                    <span className="text-green-500">20% off</span>
                  </div>

                  <Link
                    to={`/buy/${course._id}`}
                    className="bg-orange-500 w-full text-white px-4 py-2 rounded-lg hover:bg-blue-500 duration-300"
                  >
                    Buy Now
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Courses;
