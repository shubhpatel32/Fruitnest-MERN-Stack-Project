const express = require("express");
const adminController = require("../controllers/admin-fruit-controller");
const router = express.Router();
const { authMiddleware } = require("../middlewares/auth-middleware");
const adminMiddleware = require("../middlewares/admin-middleware");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../../Frontend/public/Images"));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

router
  .route("/")
  .get(authMiddleware, adminMiddleware, adminController.getAllFruits);

router
  .route("/add")
  .post(
    authMiddleware,
    adminMiddleware,
    upload.single("image"),
    adminController.addFruit
  );

router
  .route("/:id")
  .get(authMiddleware, adminMiddleware, adminController.getFruitById);

router
  .route("/update/:id")
  .patch(authMiddleware, adminMiddleware, adminController.updateFruitById);

router
  .route("/delete/:id")
  .delete(authMiddleware, adminMiddleware, adminController.deleteFruitById);

module.exports = router;
