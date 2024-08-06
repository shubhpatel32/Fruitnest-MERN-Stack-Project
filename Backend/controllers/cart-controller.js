const User = require("../models/user-models");

const addToCart = async (req, res) => {
  try {
    const userData = await User.findById(req.body.userId);

    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }

    const cartData = userData.cartData || {};

    if (!cartData[req.body.itemId]) {
      cartData[req.body.itemId] = 1;
    } else {
      cartData[req.body.itemId] += 1;
    }

    await User.findByIdAndUpdate(req.body.userId, { cartData });
    res.json({ success: true, message: "Added to cart" });
  } catch (error) {
    console.log("Error in adding to cart", error);
    res.json({ success: false, message: "Error" });
  }
};

const removeFromCart = async (req, res) => {
  try {
    const userData = await User.findById(req.body.userId);
    const cartData = await userData.cartData;

    if (cartData[req.body.itemId] > 0) {
      cartData[req.body.itemId] -= 1;

      if (cartData[req.body.itemId] === 0) delete cartData[req.body.itemId];
    }
    await User.findByIdAndUpdate(req.body.userId, { cartData });
    res.json({ success: true, message: "Removed from cart" });
  } catch (error) {
    console.log("Error in remove from cart", error);
    res.json({ success: false, message: "Error" });
  }
};

const deleteFromCart = async (req, res) => {
  try {
    const userData = await User.findById(req.body.userId);
    const cartData = await userData.cartData;

    delete cartData[req.body.itemId];

    await User.findByIdAndUpdate(req.body.userId, { cartData });
    res.json({ success: true, message: "Deleted from cart" });
  } catch (error) {
    console.log("Error in delete from cart", error);
    res.json({ success: false, message: "Error" });
  }
};

const getCart = async (req, res) => {
  try {
    const userData = await User.findById(req.body.userId);
    const cartData = await userData.cartData;
    res.json({ success: true, cartData });
  } catch (error) {
    console.log("Error in getting cart data", error);
    res.json({ success: false, message: "Error" });
  }
};

module.exports = { addToCart, removeFromCart, getCart, deleteFromCart };
