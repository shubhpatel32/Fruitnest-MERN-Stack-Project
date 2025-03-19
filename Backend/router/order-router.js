const express = require("express");
const router = express.Router();
const {
  placeOrder,
  showOrder,
  verifyPayment,
  cancelOrder,
  getInvoice,
} = require("../controllers/order-controller");
const { authMiddleware } = require("../middlewares/auth-middleware");

router.route("/place").post(authMiddleware, placeOrder);
router.route("/show").get(authMiddleware, showOrder);
router.route("/cancel").post(authMiddleware, cancelOrder);
router.route("/verify").post(authMiddleware, verifyPayment);
router.route("/invoice/:orderId").get(authMiddleware, getInvoice);

module.exports = router;
