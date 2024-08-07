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
    res.status(500).json({ success: false, message: "Error" });
  }
};

const showOrder = async (req, res) => {
  try {
    const userId = req.user._id;
    const orders = await Order.find({ userId: userId }).sort({ date: -1 });

    if (!orders) {
      return res
        .status(404)
        .json({ success: false, message: "No orders found for this user." });
    }

    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching user orders:", error);
    res.status(500).json({ success: false, message: "Server error." });
  }
};

module.exports = { placeOrder, showOrder };
