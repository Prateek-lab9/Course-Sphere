import React from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Home from "./components/Home";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Buy from "./components/Buy";
import { ToastContainer, toast } from "react-toastify";
import Courses from "./components/Courses";
import Purchases from "./components/Purchases";
import AdminSignup from "./admin/AdminSignup";
import AdminLogin from "./admin/AdminLogin";
import AdminDashboard from "./admin/AdminDashboard";
import CourseCreate from "./admin/CourseCreate";
import UpdateCourse from "./admin/UpdateCourse";
import OurCourses from "./admin/OurCourses";
function App() {
  const admin = JSON.parse(localStorage.getItem("admin"));
  const user = JSON.parse(localStorage.getItem("user"));

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <Signup />,
    },
    {
      path: "/buy/:courseId",
      element: <Buy />,
    },
    {
      path: "/courses",
      element: <Courses />,
    },
    {
      path: "/purchases",
      element: user ? <Purchases /> : <Navigate to="/login" />,
    },

    {
      path: "/admin/signup",
      element: <AdminSignup />,
    },
    {
      path: "/admin/login",
      element: <AdminLogin />,
    },
    {
      path: "/admin/dashboard",
      element:  admin ? <AdminDashboard /> : <Navigate to="/admin/login"/>,
    },
    {
      path: "/admin/create-course",
      element: <CourseCreate />,
    },
    {
      path: "/admin/update-course/:id",
      element: <UpdateCourse />,
    },
    {
      path: "/admin/our-courses",
      element: <OurCourses />,
    },
  ]);
  return (
    <div>
      <RouterProvider router={router} />
      <ToastContainer position="top-center" />
    </div>
  );
}

export default App;
