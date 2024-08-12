const express = require("express");
const adminController = require("../controllers/admin-review-controller");
const router = express.Router();
const { authMiddleware } = require("../middlewares/auth-middleware");
const adminMiddleware = require("../middlewares/admin-middleware");

router
  .route("/")
  .get(authMiddleware, adminMiddleware, adminController.getAllReviews);
router
  .route("/delete/:id")
  .delete(authMiddleware, adminMiddleware, adminController.deleteReviewById);

module.exports = router;
