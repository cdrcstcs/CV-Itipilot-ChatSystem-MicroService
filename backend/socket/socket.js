import { Server } from "socket.io";
import http from "http";
import express from "express";
import cors from "cors"

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
	cors: {
		origin: "http://localhost:3000",
		methods: ["GET", "POST"],
	},
});

export const getReceiverSocketId = (receiverId) => {
	return userSocketMap[receiverId];
};

const userSocketMap = {}; // {userId: socketId}


io.httpServer.on("upgrade", (request, socket, head) => {
    // Set Cache-Control and Pragma headers to prevent caching
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

	// io.emit() is used to send events to all the connected clients
	io.emit("getOnlineUsers", Object.keys(userSocketMap));

	// socket.on() is used to listen to the events. can be used both on client and server side
	socket.on("disconnect", () => {
		console.log("user disconnected", socket.id);
		delete userSocketMap[userId];
		io.emit("getOnlineUsers", Object.keys(userSocketMap));
	});
});

export { app, io, server };

