import express from "express";
import { buyCourses, courseDetails, createCourse, deleteCourse, getCourses, updateCourse } from "../controllers/course.controller.js";
import useMiddleware from "../middlewares/user.mid.js";
import adminMiddleware from "../middlewares/admin.mid.js";
const router = express.Router();

router.post("/create", adminMiddleware, createCourse);
router.put("/update/:id",adminMiddleware, updateCourse);
router.delete("/delete/:courseId", adminMiddleware,deleteCourse);
router.get("/courses", getCourses);
router.get("/:courseId", courseDetails);
router.get("/buy/:courseId", useMiddleware, buyCourses);
export default router;
