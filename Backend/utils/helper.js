require("dotenv").config();
const {
  reviews,
  blogPosts,
  gallery,
  fruits,
  signupUsers,
} = require("./seedHelpers");
const Review = require("../models/review-model");
const User = require("../models/user-models");
const mongoose = require("mongoose");
const Blog = require("../models/blog-model");
const Gallery = require("../models/gallery-model");
const Fruit = require("../models/fruit-model");
const Order = require("../models/order-model");

const seedReviews = async () => {
  try {
    await Review.deleteMany({});
    await Review.insertMany(reviews);
    console.log("Reviews seeded");
  } catch (error) {
    console.error("Error in inserting reviews:", error);
  }
};

const seedUsers = async () => {
  try {
    // await User.deleteMany({});
    await User.insertMany(signupUsers);
  } catch (error) {
    console.error("Error in inserting users:", error);
  }
};

const seedBlogs = async () => {
  try {
    await Blog.deleteMany({});
    await Blog.insertMany(blogPosts);
    console.log("Blogs seeded");
  } catch (error) {
    console.error("Error in inserting blogs:", error);
  }
};

const seedGallery = async () => {
  try {
    await Gallery.deleteMany({});
    await Gallery.insertMany(gallery);
    console.log("Gallery seeded");
  } catch (error) {
    console.error("Error in inserting gallery images:", error);
  }
};

const seedFruits = async () => {
  try {
    await Fruit.deleteMany({});
    await Fruit.insertMany(fruits);
    console.log("Fruits seeded");
  } catch (error) {
    console.error("Error in inserting fruits:", error);
  }
};

async function renameField() {
  await Gallery.updateMany({}, { $rename: { url: "path" } });
  console.log("Field renamed successfully");
}

const removeOrphanedOrders = async () => {
  try {
    const existingUserIds = await User.find().distinct("_id");
    await Order.deleteMany({ userId: { $nin: existingUserIds } });

    console.log("Orphaned orders removed successfully");
  } catch (error) {
    console.error("Error removing orphaned orders:", error);
  }
};

module.exports = {
  seedReviews,
  seedBlogs,
  seedGallery,
  seedFruits,
  seedUsers,
  renameField,
  removeOrphanedOrders,
};
