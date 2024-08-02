const express = require("express");
const router = express.Router();
const reviews = require("../controllers/review-controller");
const reviewSchema = require("../validators/review-validator");
const validate = require("../middlewares/validate-middleware");

router.route("/form/review").post(validate(reviewSchema), reviews.reviewForm);
router.route("/data/review").get(reviews.getReview);

module.exports = router;
