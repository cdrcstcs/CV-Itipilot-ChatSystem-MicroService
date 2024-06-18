import express from "express";
import { getUsersForSidebar, getUser } from "../controllers/user.controller.js";
const router = express.Router();
router.get("/", getUsersForSidebar);
router.get("/:id",getUser);
export default router;
