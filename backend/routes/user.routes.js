import express from "express";
import { getUsersForSidebar } from "../controllers/user.controller.js";
const router = express.Router();
router.get("/", getUsersForSidebar);
export default router;
