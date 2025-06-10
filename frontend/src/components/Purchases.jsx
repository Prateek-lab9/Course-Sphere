import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import logo from "../assets/logo.png";
import { Link, NavLink } from "react-router-dom";

function Purchases() {
  const [purchases, setPurchase] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("token"));
    const token = user?.token;

    const fetchPurchases = async () => {
      if (!token) {
        setError("Please login to purchase the course");
        return;
      }

      try {
        const res = await axios.get(
          "https://course-sphere.onrender.com/api/v1/user/purchases",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          }
        );
        setPurchase(res.data.courseData);
      } catch (error) {
        setError("Failed to fetch purchase data");
      }
    };
    fetchPurchases();
  }, []);
  useEffect(() => {
    console.log("Updated purchases:", purchases);
  }, [purchases]);

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
    <div className="flex min-h-screen">
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
            to="/courses"
            className={({ isActive }) =>
              `flex items-center  ${
                isActive ? "text-blue-500" : "text-zinc-500"
              }`
            }
          >
            Courses
          </NavLink>
          <NavLink
            to="#"
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
      <div className="flex-1 p-8 bg-zinc-700">
        <h2 className="text-xl font-semibold text-zinc-300 mb-6">
          My Purchases
        </h2>
        <hr className="text-white mb-6"/>

        {error && <div className="text-red-500 text-center mb-4">{error}</div>}

        {purchases.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {purchases.map((purchase, index) => (
              <div key={index} className="border border-zinc-500 bg-transparent rounded-md p-6 mb-6">
                <div className="flex flex-col items-center gap-4">
                  <img
                    className="rounded-md w-full h-40 md:h-72 object-cover"
                    src={
                      purchase.image?.url || "https://via.placeholder.com/200"
                    }
                    alt={purchase.title}
                  />
                  <div className="text-center">
                    <h3 className="text-lg text-zinc-400 font-semibold">{purchase.title}</h3>
                    <p className="text-zinc-400 text-sm">
                      {purchase.description.length > 100
                        ? `${purchase.description.slice(0, 100)}...`
                        : purchase.description}
                    </p>
                    <span className="text-green-700 font-semibold text-sm">
                      ${purchase.price} only
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
         <p className="text-zinc-200">You have not purchased any courses yet.</p>
        )}
      </div>
    </div>
  );
}

export default Purchases;
