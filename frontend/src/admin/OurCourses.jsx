import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

function OurCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setloading] = useState(true);
const navigate = useNavigate();
  const admin = JSON.parse(localStorage.getItem("admin"));
  const token = admin.token;

  if(!token){
    toast.error("Please login to admin")
    navigate("/admin/login")
  }
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
        setloading(false);
      } catch (error) {
        console.log("Error in fetching", error);
      }
    };
    fetchCourses();
  }, []);

  const handleDeleteCourse = async (id) => {
    try {
      const res = await axios.delete(
        `https://course-sphere.onrender.com/course/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      toast.success(res.data.message);
      const updateCourses = courses.filter((course)=>course._id!==id)
      setCourses(updateCourses)
    } catch (error) {
      console.log("Error in deleting course: ", error);
      toast.error(error.response.data.erros || "Error in deleting course");
    }
  };

  if(loading){
    return <div className="w-full h-screen bg-zinc-600">
        <p className="text-center text-zinc-400">Loading...</p>
    </div>
  }
    return (
    <div className="bg-zinc-600 p-8 space-y-4">
      <h1 className="text-3xl font-semibold text-zinc-400 text-center mb-8">Our Courses</h1>
      <Link
        className="bg-orange-400 mb-10 py-2 px-4 rounded-lg text-white hover:bg-orange-950 duration-300"
        to={"/admin/dashboard"}
      >
        Go to dashboard
      </Link>
      <div className="grid grid-cols-1 sm:grid-cols-2 mt-10 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div key={course._id} className="bg-zinc-600 border border-zinc-400 rounded-lg p-4">
            {/* Course Image */}
            <div className="w-full h-40 md:h-72 overflow-hidden mb-4"><img
              src={course?.image?.url}
              alt={course.title}
              className="h-full w-full object-cover rounded-md"
            /></div>
            {/* Course Title */}
            <h2 className="text-xl font-semibold mt-4 text-gray-400">
              {course.title}
            </h2>
            {/* Course Description */}
            <p className="text-gray-400 mt-2 text-sm">
              {course.description.length > 200
                ? `${course.description.slice(0, 200)}...`
                : course.description}
            </p>
            {/* Course Price */}
            <div className="flex justify-between mt-4 text-gray-300 font-bold">
              <div>
                {" "}
                ${course.price}{" "}
                <span className="line-through text-gray-500">5999</span>
              </div>
            </div>

            <div className="flex justify-between">
              <Link
                to={`/admin/update-course/${course._id}`}
                className="bg-orange-500 text-white py-2 px-4 mt-4 rounded hover:bg-blue-600"
              >
                Update
              </Link>

              <button
                onClick={() => handleDeleteCourse(course._id)}
                className="bg-red-500 text-white py-2 px-4 mt-4 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OurCourses;
