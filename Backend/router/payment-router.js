const express = require("express");
const router = express.Router();
const {
  initiatePayment,
  verifyPayment,
} = require("../controllers/payment-controller");
const { authMiddleware } = require("../middlewares/auth-middleware");

router.post("/initiate", authMiddleware, initiatePayment);
router.post("/verify", authMiddleware, verifyPayment);

module.exports = router;
