const express = require("express");
const adminController = require("../controllers/admin-gallery-controller");
const router = express.Router();
const { authMiddleware } = require("../middlewares/auth-middleware");
const adminMiddleware = require("../middlewares/admin-middleware");

router
  .route("/")
  .get(authMiddleware, adminMiddleware, adminController.getAllGallery);
router
  .route("/delete/:id")
  .delete(authMiddleware, adminMiddleware, adminController.deleteGalleryById);

module.exports = router;
