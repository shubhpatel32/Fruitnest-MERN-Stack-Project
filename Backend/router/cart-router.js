const express = require("express");
const router = express.Router();
const cart = require("../controllers/cart-controller");
const {
  authMiddleware2,
  authMiddleware,
} = require("../middlewares/auth-middleware");

router.route("/data/cart").post(authMiddleware2, cart.getCart);
router.route("/add/cart").post(authMiddleware2, cart.addToCart);
router.route("/remove/cart").post(authMiddleware2, cart.removeFromCart);
router.route("/delete/cart").post(authMiddleware2, cart.deleteFromCart);

module.exports = router;
