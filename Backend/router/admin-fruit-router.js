const express = require("express");
const adminController = require("../controllers/admin-fruit-controller");
const router = express.Router();
const { authMiddleware } = require("../middlewares/auth-middleware");
const adminMiddleware = require("../middlewares/admin-middleware");

router
  .route("/")
  .get(authMiddleware, adminMiddleware, adminController.getAllFruits);
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
