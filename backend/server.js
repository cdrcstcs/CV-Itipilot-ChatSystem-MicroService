import express from "express";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";
import connectToMongoDB from "./db/connectToMongoDB.js";
import { app, server } from "./socket/socket.js";
import { getImageById } from "./controllers/image.controller.js";
import jwt from "jsonwebtoken"
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
const jwtSecret = 'fasefraw4r5r3wq45wdfgw34twdfg';
async function verifyToken(req, res) {
    try {
        const token = req.body.token; // Extract token from request body
        jwt.verify(token, jwtSecret, {}, (err, userData) => {
            if (err) {
                throw err; // Throw error if verification fails
            } else {
                res.status(200).json(userData); // Send user data if verification succeeds
            }
        });
    } catch (err) {
        res.status(401).send(err.message); // Handle authentication failure
    }
}
app.post('/verify', verifyToken);
app.use(Middleware);
app.use("/messages", messageRoutes);
app.use("/users", userRoutes);
app.get('/images/:id', getImageById);
server.listen(PORT,'localhost',() => {
	connectToMongoDB();
	console.log(`Server Running on port ${PORT}`);
});
