import express from "express";
import { login, logout, purchased, signUp } from "../controllers/user.controller.js";
import useMiddleware from "../middlewares/user.mid.js";
const router = express.Router();

router.post("/signup",signUp)
router.post("/login",login)
router.get("/logout",logout)
router.get("/purchases",useMiddleware,purchased)
export default router;
