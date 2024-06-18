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
let data = null;
const getUserData = async (req, res) => {
  try {
	data = req.body.data;
	  res.status(200).json("ok" );
	} catch (err) {
	  console.log(err);
	  res.status(500).json("Failed to get userData!");
	}
};
const getUserDataForClientSide = async (req, res) => {
  try {
	res.status(200).json({ data });
  } catch (err) {
	console.error("Error awaiting data:", err);
	res.status(500).json("Failed to get userData!");
  }
};
console.log(data);
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
app.post("/userData", getUserData);
app.get("/userdataclient", getUserDataForClientSide);
app.use(Middleware);
app.use("/messages", messageRoutes);
app.use("/users", userRoutes);
app.get('/images/:id', getImageById);

server.listen(PORT,'localhost',() => {
	connectToMongoDB();
	console.log(`Server Running on port ${PORT}`);
});
