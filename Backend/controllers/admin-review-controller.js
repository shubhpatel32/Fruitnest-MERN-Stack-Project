const Review = require("../models/review-model");

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
    console.log("Error in deleting review by ID", error);
  }
};

module.exports = {
  getAllReviews,
  deleteReviewById,
};
