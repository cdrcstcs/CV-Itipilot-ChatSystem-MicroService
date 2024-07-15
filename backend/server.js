import express from "express";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";
import { app, server } from "./socket/socket.js";
import { getImageById } from "./controllers/image.controller.js";
import mongoose from "mongoose";
import Image from "./models/Image.js";
import User from "./models/user.model.js";
import Message from "./models/message.model.js";
import Conversation from "./models/conversation.model.js";
import 'dotenv/config';
import { generateImageData, generateUsers, generateMessages, generateConversations } from "./data.js";
app.use(express.json());
app.use(express.static('uploads'));
app.use("/messages", messageRoutes);
app.use("/users", userRoutes);
app.get('/images/:id', getImageById);
mongoose.connect(process.env.DATABASE_URL).then(async () => {
	await Image.deleteMany();
	await User.deleteMany();
	await Message.deleteMany();
	await Conversation.deleteMany();
	await Image.insertMany(generateImageData());
	await User.insertMany(await generateUsers());
	await Message.insertMany(await generateMessages());
	await Conversation.insertMany(await generateConversations());
	server.listen(process.env.PORT, 'localhost',() => console.log(`Server running on PORT: ${process.env.PORT}`));
}).catch((error) => console.log(`${error} did not connect`));
  