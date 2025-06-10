import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import { z } from "zod";
import jwt from "jsonwebtoken";
import config from "../config.js";
import { Purchase } from "../models/purchase.model.js";
import { Course } from "../models/course.model.js";

export const signUp = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  const userSchema = z.object({
    firstName: z
      .string()
      .min(4, { message: "firstName sholud be atleat 4 char long" }),
    lastName: z
      .string()
      .min(4, { message: "lastName sholud be atleat 4 char long" }),
    email: z.string().email(),
    password: z
      .string()
      .min(6, { message: "password sholud be atleat 6 char long" }),
  });

  const validateData = userSchema.safeParse(req.body);

  if (!validateData.success) {
    return res
      .status(400)
      .json({ errors: validateData.error.issues.map((err) => err.message) });
  }

  try {
    let existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ errors: "User already exists" });
    }

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, (err, hash) => {
        if (err) {
          console.log(err);
          return req.status(400).json({ errors: "Error in password hashing" });
        }

        const newUser = User.create({
          firstName,
          lastName,
          email,
          password: hash,
        });
        res.status(200).json({ message: "Signup succeed", newUser });
      });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ errors: "Error in signup" });
  }
};


export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    
    const passCorrect = await bcrypt.compare(password, user.password);
    if (!user || !passCorrect) {
      return res.status(400).json({ errors: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, config.JWT_USER_PASSWORD, {
      expiresIn: "1d",
    });
    console.log(token)
    const cookieOptions = {
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
    };
    res.cookie("token", token, cookieOptions);
    res.status(200).json({ message: "Login successful", user, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ errors: "Error in login" });
  }
};

export const logout = async (req, res) => {
  try {
    if(!req.cookies.token){
        res.status(401).json({ error: "Kindly login first" });
    }
    res.clearCookie("token");
    res.status(200).json({ message: "Logout Successful" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error in logging out" });
  }
};

export const purchased = async (req, res) => {
  const userId = req.userId;
  try {
    const purchasedCourses = await Purchase.find({userId})
    const purchasedCoursesId = [];

    for(let i=0;i<purchasedCourses.length;i++){
      purchasedCoursesId.push(purchasedCourses[i].courseId)
    }
    const courseData = await Course.find({
      _id:{$in:purchasedCoursesId}
    })  
    console.log(courseData)
res.status(200).json({purchasedCourses,courseData})
  } catch (error) {
    console.log(error)
    res.status(500).json({errors:"Error in purchasing"})
  }
};
