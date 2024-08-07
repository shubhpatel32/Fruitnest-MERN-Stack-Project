const express = require("express");
const router = express.Router();
const reviews = require("../controllers/review-controller");
const reviewSchema = require("../validators/review-validator");
const validate = require("../middlewares/validate-middleware");

router.route("/form").post(validate(reviewSchema), reviews.reviewForm);
router.route("/data").get(reviews.getReview);

module.exports = router;
