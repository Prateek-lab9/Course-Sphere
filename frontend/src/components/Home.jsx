import React, { useEffect, useState } from "react";
import Footer from "./Footer";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

function Home() {
  const [courses, setCourses] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
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
          "https://course-sphere.onrender.com/course/courses",
          {
            withCredentials: true,
          }
        );
        console.log(data);
        let response = data.data;
        setCourses(response);
      } catch (error) {
        console.log("Error in fetching", error);
      }
    };
    fetchCourses();
  }, []);

  const handleLogout = async () => {
   try {
     const res = await axios.get("https://course-sphere.onrender.com/user/logout", {
      withCredentials: true,
    });
    setIsLoggedIn(false);
    localStorage.removeItem("token")
    const notify = async () =>
           toast.success(await res.data.message, {
             position: "top-center",
           });
         notify();
   } catch (error) {
      const notify = async () =>
           toast.error("Error in Logging out" , {
             position: "top-center",
           });
         notify();
   }
  };
  
  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="text-white bg-gradient-to-r from-zinc-950 to-blue-950 min-h-screen w-full px-[10vw]">

      <div className=" flex md:justify-between w-full bg-transparent py-6 items-center">
        <div className="hidden md:flex items-center gap-2 ">
          <img className="w-10" src={logo} alt="" />
          <span className="text-orange-500 text-2xl font-semibold">
            CourseSphere
          </span>
        </div>
        <div className="flex md:justify-end w-full justify-center gap-4">
         {isLoggedIn?(<> <Link
            to="/"
            onClick={handleLogout}
            className="border border-white rounded-md px-4 py-2 hover:bg-white hover:translate-y-1 transition-all duration-200 hover:text-black"
          >
            Logout
          </Link>
          </>):(<>
           <Link
            to="/admin/signup"
            className="border border-white rounded-md px-4 py-2 hover:bg-white hover:translate-y-1 transition-all duration-200 hover:text-black"
          >
            Admin
          </Link>
           <Link
            to="/login"
            className="border border-white rounded-md px-4 py-2 hover:bg-white hover:translate-y-1 transition-all duration-200 hover:text-black"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="border border-white rounded-md px-4 py-2  hover:bg-white hover:translate-y-1 transition-all duration-200 hover:text-black"
          >
            Signup
          </Link></>)}
        </div>
      </div>{" "}

      <section className="mt-14 flex justify-center gap-5 items-center flex-col ">
        <h1 className="text-orange-500 text-3xl font-bold">CourseSphere</h1>
        <p className="text-zinc-500 text-sm">
          Sharpen your skills with courses crafted by experts
        </p>
        <div className="flex gap-4">
          <Link to="/courses" className="text-white font-semibold rounded-md px-5 py-2 bg-orange-500 hover:bg-transparent hover:border transition-all hover:translate-y-1 duration-200 hover:border-white">
            Explore Courses
          </Link>
          <Link to="https://www.youtube.com/" className="text-white border border-white font-semibold rounded-md px-5 py-2 bg-transparent hover:bg-white hover:text-black transition-all hover:translate-y-1 duration-200 ">
            Courses Videos
          </Link>
        </div>
      </section>
      <section>
        <Slider {...settings}>
          {courses.map((course) => (
            <div key={course._id} className="p-4">
              <div className="relative flex-shrink-0 md:w-60 w-40 transition-transform duration-300 transform hover:scale-105">
                <div className="bg-zinc-700 rounded-md overflow-hidden">
                  <img
                    className="w-full md:h-32 h-24 object-contain"
                    src={course.image.url}
                    alt=""
                  />
                  <div className="text-center p-6">
                    <h2 className="text-white font-semibold text-xl">
                      {course.title}
                    </h2>
                    <button className="mt-4 bg-orange-500 text-white rounded-md px-3 py-2 hover:bg-blue-500 transition-all duration-200">
                      Enroll Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </section>
      <Footer />
    </div>
  );
}

export default Home;
