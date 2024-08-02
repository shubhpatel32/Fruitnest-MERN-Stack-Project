require("dotenv").config(); // Load environment variables
const { reviews } = require("./seedHelpers");
const Review = require("../models/review-model");
const mongoose = require("mongoose");

const seed = async () => {
  try {
    await Review.deleteMany({});
    await Review.insertMany(reviews);
  } catch (error) {
    console.error("Error in inserting reviews:", error);
  }
};

module.exports = seed;
