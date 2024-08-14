const express = require("express");
const adminController = require("../controllers/admin-blog-controller");
const router = express.Router();
const { authMiddleware } = require("../middlewares/auth-middleware");
const adminMiddleware = require("../middlewares/admin-middleware");

router
  .route("/")
  .get(authMiddleware, adminMiddleware, adminController.getAllBlogs);

router
  .route("/:id")
  .get(authMiddleware, adminMiddleware, adminController.getBlogById);

router
  .route("/update/:id")
  .patch(authMiddleware, adminMiddleware, adminController.updateBlogById);

router
  .route("/delete/:id")
  .delete(authMiddleware, adminMiddleware, adminController.deleteBlogById);

module.exports = router;
