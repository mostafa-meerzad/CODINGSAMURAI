import express from "express";
import { protectRoute } from "../middlewares/auth-middleware.js";
import { getUsersForSideBar, getMessages } from "../controllers/message.controller.js";

const router = express.Router();

router.get("/users", protectRoute, getUsersForSideBar);


export default router;
