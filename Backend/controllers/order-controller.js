const Order = require("../models/order-model");
const User = require("../models/user-models");

const placeOrder = async (req, res) => {
  try {
    const newOrder = new Order({
      userId: req.body.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
    });
    await newOrder.save();
    await User.findByIdAndUpdate(req.body.userId, { cartData: {} });

    res.json({ success: true, message: "Order Placed" });
  } catch (error) {
    console.log("Error in placeOrder", error);
    res.json({ success: false, message: "Error" });
  }
};

module.exports = placeOrder;
