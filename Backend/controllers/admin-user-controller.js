const User = require("../models/user-models");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ isAdmin: false }, { password: 0 })
      .sort({
        username: 1,
      })
      .collation({ locale: "en" });
    if (!users || users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }
    return res.status(200).json(users);
  } catch (error) {
    console.log("Error in getting users", error);
  }
};

const getUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await User.findOne({ _id: id }, { password: 0 });
    return res.status(200).json(data);
  } catch (error) {
    console.log("Error in getting user by ID", error);
  }
};

const updateUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedUserData = req.body;

    const updatedData = await User.updateOne(
      { _id: id },
      { $set: updatedUserData }
    );

    return res.status(200).json(updatedData);
  } catch (error) {
    console.log("Error in updating user by ID", error);
  }
};

const deleteUserById = async (req, res) => {
  try {
    const id = req.params.id;
    await Review.deleteMany({ userId: id });
    await Order.deleteMany({ userId: id });
    await User.deleteOne({ _id: id });
    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.log("Error in deleting user by ID", error);
  }
};

module.exports = {
  getAllUsers,
  deleteUserById,
  getUserById,
  updateUserById,
};
