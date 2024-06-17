import express from "express";
import cookieParser from "cookie-parser";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";
import connectToMongoDB from "./db/connectToMongoDB.js";
import { app, server } from "./socket/socket.js";
const PORT = 3500;
app.use(express.json());
app.use(cookieParser());
app.use("/chatapp/messages", messageRoutes);
app.use("/chatapp/users", userRoutes);
server.listen(PORT,'localhost',() => {
	connectToMongoDB();
	console.log(`Server Running on port ${PORT}`);
});
