require("dotenv").config();
const { reviews, blogPosts } = require("./seedHelpers");
const Review = require("../models/review-model");
const mongoose = require("mongoose");
const Blog = require("../models/blog-model");

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

module.exports = { seedReviews, seedBlogs };
