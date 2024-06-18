import User from "../models/user.model.js";
export const getUsersForSidebar = async (req, res) => {
	try {
		console.log(req.user);
		const loggedInUserId = req.user;
		const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");
		res.status(200).json(filteredUsers);
	} catch (error) {
		res.status(500).json({ error: "Internal server error" });
	}
};
