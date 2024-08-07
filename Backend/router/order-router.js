const express = require("express");
const router = express.Router();
const placeOrder = require("../controllers/order-controller");
const { authMiddleware2 } = require("../middlewares/auth-middleware");

router.route("/place").post(authMiddleware2, placeOrder);

module.exports = router;
