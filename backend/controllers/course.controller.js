import { Course } from "../models/course.model.js";
import { v2 as cloudinary } from "cloudinary";
import { Purchase } from "../models/purchase.model.js";

export const createCourse = async (req, res) => {
  const adminId = req.adminId;
  const { title, description, price } = req.body;

  try {
    if (!title || !description || !price) {
      return res.status(400).json({ errors: "All fields are required" });
    }
    const { image } = req.files;
    if (!req.files) {
      return res.status(400).json({ errors: "No file uploaded" });
    }

    const allowedFormat = ["image/png", "image/jpeg"];
    if (!allowedFormat.includes(image.mimetype)) {
      return res
        .status(400)
        .json({ errors: "Invalid file format, only png and jpg are allowed" });
    }

    const cloud_response = await cloudinary.uploader.upload(image.tempFilePath);
    if (!cloud_response || cloud_response.error) {
      return res
        .status(400)
        .json({ errors: "Error uploading file to cloudinary" });
    }
    const courseData = {
      title,
      description,
      price,
      image: {
        public_id: cloud_response.public_id,
        url: cloud_response.url,
      },
      creatorId: adminId,
    };
    const course = await Course.create(courseData);
    res.json({
      message: "Course created successfully",
      course,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error creating course" });
  }
};

export const updateCourse = async (req, res) => {
  const adminId = req.adminId;
  const { id } = req.params;
  const { title, description, price, image } = req.body;
  try {
    const courseSearch = await Course.findOne({ _id: id });
    if (!courseSearch) {
      return res.status(400).json({ error: "Course not found" });
    }
    const course = await Course.findOneAndUpdate(
      { _id: id, creatorId: adminId },
      {
        title,
        description,
        price,
        image: {
          public_id: image?.public_id,
          url: image?.url,
        },
      },
      { new: true }
    );
    if(!course){
      res.status(401).json({ errors:"Can't update, created by other admin"});
    }
    res.status(200).json({ message: "Course Updated successfully", course });
  } catch (error) {
    res.status(500).json({ errors: "Error in course updation" });
    console.log("Couldn't update course", error);
  }
};

export const deleteCourse = async (req, res) => {
  const adminId = req.adminId;
  const { courseId } = req.params;

  try {
    let deletedCourse = await Course.findOneAndDelete({
      _id: courseId,
      creatorId: adminId,
    });
    if (deletedCourse) {
      res.status(200).json({ message: "Course deleted successfully" });
    }
    if (!deletedCourse) {
      res.status(400).json({ errors: "Can't delete, created by other admin" });
    }
  } catch (error) {
    console.log("Error in course deletion");
    res.status(500).json({ errors: "Error in deleting course" });
  }
};

export const getCourses = async (req, res) => {
  try {
    const courses = await Course.find({});
    res.status(200).json(courses);
  } catch (error) {
    console.log(error);
    res.status(500).json({ errors: "Courses not found" });
  }
};

export const courseDetails = async (req, res) => {
  const { courseId } = req.params;
  try {
    const course = await Course.findOne({ _id: courseId });
    if (!course) {
      res.status(404).json({ error: "Course not found" });
    } else {
      return res.status(200).json({ course });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ errors: "Course was not found" });
  }
};


import Stripe from "stripe";
import config from "../config.js";
const stripe = new Stripe(config.STRIPE_SECRET_KEY);

export const buyCourses = async (req, res) => {
  const { userId } = req;
  console.log(userId)
  const { courseId } = req.params;

  try {
    const course = await Course.findOne({ _id: courseId });
    if (!course) {
      return res.status(400).json({ error: "Course Not Found" });
    }

    const isExistingPurchase = await Purchase.findOne({ userId, courseId });
    if (isExistingPurchase) {
      return res
        .status(400)
        .json({ error: "User has already purchased this course" });
    }

    // Stripe payment method
    const amount = course.price;
     const paymentIntent = await stripe.paymentIntents.create({
    amount: amount,
    currency: "usd",
   payment_method_types:["card"]
  });

    res
      .status(200)
      .json({ message: "Course purchased successfully", course, clientSecret: paymentIntent.client_secret, });
  } catch (error) {
    console.log(error);
    res.status(500).json({ errors: "Error in course buying course: " + error });
  }
};
