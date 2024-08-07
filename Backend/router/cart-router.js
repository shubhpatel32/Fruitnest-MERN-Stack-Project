const express = require("express");
const router = express.Router();
const cart = require("../controllers/cart-controller");
const { authMiddleware2 } = require("../middlewares/auth-middleware");

router.route("/data").post(authMiddleware2, cart.getCart);
router.route("/add").post(authMiddleware2, cart.addToCart);
router.route("/remove").post(authMiddleware2, cart.removeFromCart);
router.route("/delete").post(authMiddleware2, cart.deleteFromCart);

module.exports = router;
