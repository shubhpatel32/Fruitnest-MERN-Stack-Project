const express = require("express");
const adminController = require("../controllers/admin-order-controller");
const router = express.Router();
const { authMiddleware } = require("../middlewares/auth-middleware");
const adminMiddleware = require("../middlewares/admin-middleware");

router
  .route("/")
  .get(authMiddleware, adminMiddleware, adminController.getAllOrders);
router
  .route("/:id")
  .get(authMiddleware, adminMiddleware, adminController.getOrderById);
router
  .route("/update/:id")
  .patch(authMiddleware, adminMiddleware, adminController.updateOrderById);
router
  .route("/delete/:id")
  .delete(authMiddleware, adminMiddleware, adminController.deleteOrderById);

module.exports = router;
