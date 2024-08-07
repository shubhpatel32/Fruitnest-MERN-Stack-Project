const express = require("express");
const router = express.Router();
const { placeOrder, showOrder } = require("../controllers/order-controller");
const { authMiddleware } = require("../middlewares/auth-middleware");

router.route("/place").post(authMiddleware, placeOrder);
router.route("/show").get(authMiddleware, showOrder);

module.exports = router;
