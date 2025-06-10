import config from "../config.js";
import { Admin } from "../models/admin.model.js";
import bcrypt from "bcrypt";
import { z } from "zod";
import jwt from "jsonwebtoken";



export const signUp = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  const adminSchema = z.object({
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

  const validateData = adminSchema.safeParse(req.body);

  if (!validateData.success) {
    return res
      .status(400)
      .json({ errors: validateData.error.issues.map((err) => err.message) });
  }

  try {
    let existingUser = await Admin.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ errors: "User already exists" });
    }

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, (err, hash) => {
        if (err) {
          console.log(err);
          return req.status(400).json({ errors: "Error in password hashing" });
        }

        const newUser = Admin.create({
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
    const admin = await Admin.findOne({ email });
    
    const passCorrect = await bcrypt.compare(password, admin.password);
    if (!admin || !passCorrect) {
      return res.status(400).json({ errors: "Invalid credentials" });
    }

    const token = jwt.sign({ id: admin._id }, config.JWT_ADMIN_PASSWORD, {
      expiresIn: "1d",
    });
    const cookieOptions = {
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
    };
    res.cookie("token", token, cookieOptions);
    res.status(200).json({ message: "Login successful", admin, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ errors: "Error in login" });
  }
};

export const logout = async (req, res) => {
  try {
   
    res.clearCookie("token");
    res.status(200).json({ message: "Logout Successful" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error in logging out" });
  }
};
