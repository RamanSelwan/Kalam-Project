const User = require("../models/User");

// Controller function to get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, "username"); // Fetch only the username field

    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Failed to fetch users", error });
  }
};
//get user by id
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id, "username email");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Failed to fetch user", error });
  }
};
module.exports = { getAllUsers, getUserById };
