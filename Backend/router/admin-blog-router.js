const express = require("express");
const adminController = require("../controllers/admin-blog-controller");
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

const upload = multer({ storage: storage });

router
  .route("/")
  .get(authMiddleware, adminMiddleware, adminController.getAllBlogs);

router
  .route("/add")
  .post(
    authMiddleware,
    adminMiddleware,
    upload.single("image"),
    adminController.addBlog
  );

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
