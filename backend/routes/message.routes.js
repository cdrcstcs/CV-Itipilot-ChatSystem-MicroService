import express from "express";
import { getMessages, sendMessage, sendMessageAuto } from "../controllers/message.controller.js";
const router = express.Router();
router.get("/:id", getMessages);
router.post("/send/:id", sendMessage);
router.post("/sendauto/:id", sendMessageAuto);
export default router;
