import express from "express";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";
import connectToMongoDB from "./db/connectToMongoDB.js";
import { app, server } from "./socket/socket.js";
import { getImageById } from "./controllers/image.controller.js";
import cors from "cors";
const PORT = 3500;
app.use(express.json());
app.use(cors({
	credentials: true,
	origin: true
}));
const Middleware = (req, res, next) => {
	try {
		const authHeader = req.headers.authorization;
		const token = authHeader && authHeader.split(" ")[1];		
		req.user = token;
		next();
	}
	catch (err) {
	  res.status(500).json({ error: "Failed to get userData!" });
	}
};
app.use(Middleware);
app.use("/messages", messageRoutes);
app.use("/users", userRoutes);
app.get('/images/:id', getImageById);
server.listen(PORT,'localhost',() => {
	connectToMongoDB();
	console.log(`Server Running on port ${PORT}`);
});
