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
export async function getUser(req, res) {
	try {
	  const user = await User.findById(req.params.id);
	  if (!user) return res.status(404).json({ message: 'User not found' });
	  res.json(user);
	} catch (error) {
	  res.status(500).json({ message: error.message });
	}
  }