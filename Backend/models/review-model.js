const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  review: {
    type: String,
    required: true,
  },
});

const Review = new mongoose.model("Review", reviewSchema);
module.exports = Review;
