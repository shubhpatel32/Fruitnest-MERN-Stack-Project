const Review = require("../models/review-model");

const reviewForm = async (req, res) => {
  try {
    const response = req.body;
    await Review.create(response);
    return res.status(200).json({ message: "review sent successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "review not delivered" });
  }
};

const getReview = async (req, res) => {
  try {
    const response = await Review.find({}).populate("userId", "username");

    if (!response) {
      res.status(404).json({ message: "No review found" });
      return;
    }
    res.status(200).json(response);
  } catch (error) {
    console.log(`Reviews: ${error}`);
  }
};
module.exports = { reviewForm, getReview };
