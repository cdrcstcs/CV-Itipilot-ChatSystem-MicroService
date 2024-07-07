import User from "../models/user.model.js";
export const getUsersForSidebar = async (req, res) => {
	try {
		// console.log(req.user);
		const loggedInUserId = (await User.findOne())._id;
		const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");
		res.status(200).json(filteredUsers);
	} catch (error) {
		res.status(500).json({ error: "Internal server error" });
	}
};
export async function getUser(req, res) {
	try {
	  const user = await User.findOne();
	  if (!user) return res.status(404).json({ message: 'User not found' });
	  res.json(user);
	} catch (error) {
	  res.status(500).json({ message: error.message });
	}
}
export async function getAllUser(req, res) {
	try {
	  const users = await User.find();
	  if (!users) return res.status(404).json({ message: 'no users' });
	  res.json(users);
	} catch (error) {
	  res.status(500).json({ message: error.message });
	}
}