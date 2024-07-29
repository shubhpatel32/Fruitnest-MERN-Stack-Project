const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  review: {
    type: String,
    required: true,
  },
});

const Review = new mongoose.model("Review", reviewSchema);
module.exports = Review;
