import express from "express";
import { getUsersForSidebar, getUser, getAllUser } from "../controllers/user.controller.js";
const router = express.Router();
router.get("/", getUsersForSidebar);
router.get("/cur",getUser);
router.get("/all",getAllUser);
export default router;
