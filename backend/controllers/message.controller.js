import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import User from "../models/user.model.js";
import { getReceiverSocketId, io } from "../socket/socket.js";
export const sendMessage = async (req, res) => {
	try {
		const { message } = req.body;
		console.log(message);
		const { id: receiverId } = req.params;
		const senderId = (await User.findOne())._id.toString();
		let conversation = await Conversation.findOne({
			participants: { $all: [senderId, receiverId] },
		});
		if (!conversation) {
			conversation = await Conversation.create({
				participants: [senderId, receiverId],
			});
		}
		const newMessage = new Message({
			senderId,
			receiverId,
			message,
		});
		if (newMessage) {
			conversation.messages.push(newMessage._id);
		}
		await Promise.all([conversation.save(), newMessage.save()]);
		const receiverSocketId = getReceiverSocketId(receiverId);
		if (receiverSocketId) {
			io.to(receiverSocketId).emit("newMessage", newMessage);
		}
		res.status(201).json(newMessage);
	} catch (error) {
		res.status(500).json({ error: "Internal server error" });
	}
};
export const sendMessageAuto = async (req, res) => {
	try {
		const { message } = req.body;
		const { id: senderId } = req.params;
		const receiverId = (await User.findOne())._id.toString();
		let conversation = await Conversation.findOne({
			participants: { $all: [senderId, receiverId] },
		});
		if (!conversation) {
			conversation = await Conversation.create({
				participants: [senderId, receiverId],
			});
		}
		const newMessage = new Message({
			senderId,
			receiverId,
			message,
		});
		if (newMessage) {
			conversation.messages.push(newMessage._id);
		}
		await Promise.all([conversation.save(), newMessage.save()]);
		const receiverSocketId = getReceiverSocketId(receiverId);
		if (receiverSocketId) {
			io.to(receiverSocketId).emit("newMessage", newMessage);
		}
		res.status(201).json(newMessage);
	} catch (error) {
		res.status(500).json({ error: "Internal server error" });
	}
};
export const getMessages = async (req, res) => {
	try {
		const { id: userToChatId } = req.params;
		console.log("receiver",userToChatId);
		// console.log(await User.findOne());
		const senderId = (await User.findOne())._id.toString();
		console.log("sender",senderId);
		const conversation = await Conversation.findOne({
			participants: { $all: [senderId, userToChatId] },
		}).populate("messages"); 
		if (!conversation) return res.status(200).json([]);
		const messages = conversation.messages;
		res.status(200).json(messages);
	} catch (error) {
		res.status(500).json({ error: "Internal server error" });
	}
};
