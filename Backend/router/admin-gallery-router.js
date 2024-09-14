const express = require("express");
const adminController = require("../controllers/admin-gallery-controller");
const router = express.Router();
const { authMiddleware } = require("../middlewares/auth-middleware");
const adminMiddleware = require("../middlewares/admin-middleware");
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require("multer");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'gallery',
    allowed_formats: ['jpg', 'png', 'jpeg', 'webp', 'avif'],
    public_id: (req, file) => Date.now() + '-' + file.originalname,
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
