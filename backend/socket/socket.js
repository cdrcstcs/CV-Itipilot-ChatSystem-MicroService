import { Server } from "socket.io";
import http from "http";
import express from "express";
import cors from "cors"
const app = express();
app.use(cors({
	credentials: true,
	origin: true
}));
const server = http.createServer(app);
const io = new Server(server, {
	cors: {
		origin: "*", // Allow all origins for demo purposes; restrict this in production
        methods: ["GET", "POST"],
        credentials: true
	},
});
export const getReceiverSocketId = (receiverId) => {
	// console.log(userSocketMap);
	return userSocketMap[receiverId];
};
const userSocketMap = {}; 
let count= 0;
io.on("connection", (socket) => {
	const userId = socket.handshake.query.userId;
	count= count+1;
	console.log(userId);
	console.log(count);
	if (userId != "undefined") userSocketMap[userId] = socket.id;
});
export { app, io, server };

