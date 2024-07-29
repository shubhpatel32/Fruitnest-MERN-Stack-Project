const Review = require("../models/review-model");

const reviewForm = async (req, res) => {
  try {
    const response = req.body;
    console.log(response);
    await Review.create(response);
    return res.status(200).json({ message: "review sent successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "review not delivered" });
  }
};

module.exports = reviewForm;
