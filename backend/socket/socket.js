import { Server } from "socket.io";
import http from "http";
import express from "express";
import cors from "cors"
const app = express();
app.use(cors());
const server = http.createServer(app);
const io = new Server(server, {
	cors: {
		origin: "http://localhost:5500",
		methods: ["GET", "POST"],
	},
});
export const getReceiverSocketId = (receiverId) => {
	return userSocketMap[receiverId];
};
const userSocketMap = {}; 
io.httpServer.on("upgrade", (request, socket, head) => {
    socket.write(
        'Cache-Control: no-cache, no-store\r\n' +
        'Pragma: no-cache\r\n\r\n');
    io.handleUpgrade(request, socket, head, function (socket) {
        io.emit('connection', socket, request);
    });
});
io.on("connection", (socket) => {
	console.log("a user connected", socket.id);
	const userId = socket.handshake.query.userId;
	if (userId != "undefined") userSocketMap[userId] = socket.id;
});
export { app, io, server };

