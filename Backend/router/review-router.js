const express = require("express");
const router = express.Router();
const reviewForm = require("../controllers/review-controller");
const reviewSchema = require("../validators/review-validator");
const validate = require("../middlewares/validate-middleware");

router.route("/review").post(validate(reviewSchema), reviewForm);

module.exports = router;
