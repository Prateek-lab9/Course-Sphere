import axios from "axios";
import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function CourseCreate() {
  const navigate = useNavigate();
  const [title, settitle] = useState("");
  const [description, setdescription] = useState("");
  const [price, setprice] = useState("");
  const [image, setimage] = useState("");
  const [imagePreview, setimagePreview] = useState("");

  const changePhotoHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setimagePreview(reader.result);
      setimage(file);
    };
  };

  const handleCreateCourse = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("image", image);

    const admin = JSON.parse(localStorage.getItem("admin"));
    const token = admin.token;
    if (!token) {
      navigate("/admin/login");
      return;
    }
    try {
      const res = await axios.post(
        "http://localhost:9001/api/v1/course/create",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      console.log(res.data);
      toast.success("Course created successfully");
      settitle("");
      setdescription("");
      setprice("");
      setimage("");
      setimagePreview("");
      navigate("/admin/our-courses")
    } catch (error) {
      console.log("Error in creating course: ", error);
      toast.error(error.res.data.errors);
    }
  };

  return (
    <div>
      <div className="min-h-screen flex flex-col items-center gap-5 bg-zinc-700 py-10">
        <Link to={"/admin/dashboard"}><button className="bg-green-500 hover:bg-transparent hover:border px-6 py-2 rounded-md text-white hover:border-white">
          Go To Dashboard
        </button></Link>
        <div className="max-w-4xl mx-auto p-6 border border-zinc-400 rounded-lg shadow-lg">
          <h3 className="text-2xl text-zinc-100 font-semibold mb-8">
            Create Course
          </h3>

          <form onSubmit={handleCreateCourse} className="space-y-6">
            <div className="space-y-2">
              <label className="block text-zinc-400 text-lg">Title</label>
              <input
                type="text"
                placeholder="Enter your course title"
                value={title}
                onChange={(e) => settitle(e.target.value)}
                className="w-full px-3 py-2 border border-zinc-600 text-zinc-400  rounded-md outline-none"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-zinc-400 text-lg">Description</label>
              <input
                type="text"
                placeholder="Enter your course description"
                value={description}
                onChange={(e) => setdescription(e.target.value)}
                className="w-full px-3 py-2 border border-zinc-600 text-zinc-400   rounded-md outline-none"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-zinc-400 text-lg">Price</label>
              <input
                type="number"
                placeholder="Enter your course price"
                value={price}
                onChange={(e) => setprice(e.target.value)}
                className="w-full px-3 py-2 border border-zinc-600 text-zinc-400  rounded-md outline-none"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-zinc-400 text-lg">
                Course Image
              </label>
              <div className="flex items-center justify-center">
                <img
                  src={imagePreview ? `${imagePreview}` : "/imgPL.webp"}
                  alt="Image"
                  className="w-full text-zinc-400 max-w-sm h-auto rounded-md object-cover"
                />
              </div>
              <input
                type="file"
                onChange={changePhotoHandler}
                className="w-full px-3 py-2 border border-zinc-600 text-zinc-400 rounded-md outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors duration-200"
            >
              Create Course
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CourseCreate;
