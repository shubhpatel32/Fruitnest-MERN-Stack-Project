require("dotenv").config();
const { reviews, blogPosts, gallery, fruits } = require("./seedHelpers");
const Review = require("../models/review-model");
const User = require("../models/user-models");
const mongoose = require("mongoose");
const Blog = require("../models/blog-model");
const Gallery = require("../models/gallery-model");
const Fruit = require("../models/fruit-model");

const seedReviews = async () => {
  try {
    await Review.deleteMany({});
    await Review.insertMany(reviews);
  } catch (error) {
    console.error("Error in inserting reviews:", error);
  }
};

const seedBlogs = async () => {
  try {
    await Blog.deleteMany({});
    await Blog.insertMany(blogPosts);
  } catch (error) {
    console.error("Error in inserting blogs:", error);
  }
};

const seedGallery = async () => {
  try {
    await Gallery.deleteMany({});
    await Gallery.insertMany(gallery);
  } catch (error) {
    console.error("Error in inserting gallery images:", error);
  }
};

const seedFruits = async () => {
  try {
    await Fruit.deleteMany({});
    await Fruit.insertMany(fruits);
  } catch (error) {
    console.error("Error in inserting fruits:", error);
  }
};

async function renameField() {
  await Gallery.updateMany({}, { $rename: { url: "path" } });
  console.log("Field renamed successfully");
}

module.exports = {
  seedReviews,
  seedBlogs,
  seedGallery,
  seedFruits,
  renameField,
};
