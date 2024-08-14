const express = require("express");
const adminController = require("../controllers/admin-gallery-controller");
const router = express.Router();
const { authMiddleware } = require("../middlewares/auth-middleware");
const adminMiddleware = require("../middlewares/admin-middleware");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../../Frontend/public/SliderImages"));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

router
  .route("/")
  .get(authMiddleware, adminMiddleware, adminController.getAllGallery);
router
  .route("/add")
  .post(
    authMiddleware,
    adminMiddleware,
    upload.single("image"),
    adminController.addGalleryItem
  );
router
  .route("/delete/:id")
  .delete(authMiddleware, adminMiddleware, adminController.deleteGalleryById);

module.exports = router;
