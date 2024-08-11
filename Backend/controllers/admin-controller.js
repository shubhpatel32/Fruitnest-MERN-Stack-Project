const Blog = require("../models/blog-model");
const Fruit = require("../models/fruit-model");
const Gallery = require("../models/gallery-model");
const Order = require("../models/order-model");
const Review = require("../models/review-model");
const User = require("../models/user-models");
const moment = require("moment");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ isAdmin: false }, { password: 0 });
    if (!users || !users.length === 0) {
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
    next(error);
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
    next(error);
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
    next(error);
  }
};

const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find({}).populate("userId", "username email");
    if (!reviews || reviews.length === 0) {
      return res.status(404).json({ message: "No reviews found" });
    }
    return res.status(200).json(reviews);
  } catch (error) {
    console.log("Error in getting reviews", error);
  }
};

const deleteReviewById = async (req, res) => {
  try {
    const id = req.params.id;
    await Review.deleteOne({ _id: id });
    return res.status(200).json({ message: "Review deleted successfully" });
  } catch (error) {
    next(error);
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({})
      .populate("userId", "username email")
      .sort({ date: -1 });
    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: "No orders found" });
    }
    const formattedOrders = orders.map((order) => ({
      ...order.toObject(),
      date: moment(order.date).format("Do MMM, YYYY"),
    }));

    return res.status(200).json(formattedOrders);
  } catch (error) {
    console.log("Error in getting orders", error);
  }
};

const deleteOrderById = async (req, res) => {
  try {
    const id = req.params.id;
    await Order.deleteOne({ _id: id });
    return res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    next(error);
  }
};

const getAllFruits = async (req, res) => {
  try {
    const fruits = await Fruit.find({}).sort({ name: 1 });
    if (!fruits || !fruits.length === 0) {
      return res.status(404).json({ message: "No fruits found" });
    }
    return res.status(200).json(fruits);
  } catch (error) {
    console.log("Error in getting fruits", error);
  }
};

const deleteFruitById = async (req, res) => {
  try {
    const id = req.params.id;
    await Fruit.deleteOne({ _id: id });
    return res.status(200).json({ message: "Fruit deleted successfully" });
  } catch (error) {
    next(error);
  }
};

const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({}).sort({ date: -1 });
    if (!blogs || !blogs.length === 0) {
      return res.status(404).json({ message: "No blogs found" });
    }
    const formattedBlogs = blogs.map((blog) => ({
      ...blog.toObject(),
      date: moment(blog.date).format("Do MMM, YYYY"),
    }));

    res.status(200).json(formattedBlogs);
  } catch (error) {
    console.log("Error in getting blogs", error);
  }
};

const deleteBlogById = async (req, res) => {
  try {
    const id = req.params.id;
    await Blog.deleteOne({ _id: id });
    return res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    next(error);
  }
};

const getAllGallery = async (req, res) => {
  try {
    const gallery = await Gallery.find({});
    if (!gallery || !gallery.length === 0) {
      return res.status(404).json({ message: "No gallery found" });
    }
    return res.status(200).json(gallery);
  } catch (error) {
    console.log("Error in getting gallery", error);
  }
};

const deleteGalleryById = async (req, res) => {
  try {
    const id = req.params.id;
    await Gallery.deleteOne({ _id: id });
    return res
      .status(200)
      .json({ message: "Gallery item deleted successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllUsers,
  getAllBlogs,
  getAllFruits,
  getAllReviews,
  getAllGallery,
  getAllOrders,
  deleteUserById,
  deleteReviewById,
  deleteBlogById,
  deleteGalleryById,
  deleteFruitById,
  deleteOrderById,
  getUserById,
  updateUserById,
};
