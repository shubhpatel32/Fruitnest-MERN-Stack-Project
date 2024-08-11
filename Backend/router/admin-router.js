const express = require("express");
const adminController = require("../controllers/admin-controller");
const router = express.Router();
const { authMiddleware } = require("../middlewares/auth-middleware");
const adminMiddleware = require("../middlewares/admin-middleware");

router
  .route("/users")
  .get(authMiddleware, adminMiddleware, adminController.getAllUsers);
router
  .route("/users/:id")
  .get(authMiddleware, adminMiddleware, adminController.getUserById);
router
  .route("/users/update/:id")
  .patch(authMiddleware, adminMiddleware, adminController.updateUserById);
router
  .route("/users/delete/:id")
  .delete(authMiddleware, adminMiddleware, adminController.deleteUserById);

router
  .route("/reviews")
  .get(authMiddleware, adminMiddleware, adminController.getAllReviews);
router
  .route("/reviews/delete/:id")
  .delete(authMiddleware, adminMiddleware, adminController.deleteReviewById);

router
  .route("/orders")
  .get(authMiddleware, adminMiddleware, adminController.getAllOrders);
router
  .route("/orders/delete/:id")
  .delete(authMiddleware, adminMiddleware, adminController.deleteOrderById);

router
  .route("/fruits")
  .get(authMiddleware, adminMiddleware, adminController.getAllFruits);
router
  .route("/fruits/delete/:id")
  .delete(authMiddleware, adminMiddleware, adminController.deleteFruitById);

router
  .route("/gallery")
  .get(authMiddleware, adminMiddleware, adminController.getAllGallery);
router
  .route("/gallery/delete/:id")
  .delete(authMiddleware, adminMiddleware, adminController.deleteGalleryById);

router
  .route("/blogs")
  .get(authMiddleware, adminMiddleware, adminController.getAllBlogs);
router
  .route("/blogs/delete/:id")
  .delete(authMiddleware, adminMiddleware, adminController.deleteBlogById);

module.exports = router;
