const Order = require("../models/order-model");
const moment = require("moment");
const sendEmail = require("../utils/sendEmail");

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({})
      .populate("userId", "username email")
      .sort({ date: -1 });
    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: "No orders found" });
    }
    const formattedOrders = orders.map((order) => ({
      ...order.toObject(),
      date: moment(order.date).format("Do MMM, YYYY"),
    }));

    return res.status(200).json(formattedOrders);
  } catch (error) {
    console.log("Error in getting orders", error);
  }
};

const getOrderById = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Order.findById({ _id: id });
    return res.status(200).json(data);
  } catch (error) {
    console.log("Error in getting order by ID", error);
  }
};

const updateOrderById = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const updatedData = await Order.findOneAndUpdate(
      { _id: id },
      { $set: data },
      { new: true }
    );

    if (!updatedData || !updatedData.address) {
      return res
        .status(404)
        .json({ message: "Order not found or missing address" });
    }

    const subject = "Order Status Updated";
    const { email, firstname } = updatedData.address;
    const html = ` <p>Dear ${firstname},</p>
      <p>Your order status has been updated. Please log in to your account to check the details.</p>
      <p>Thank you for shopping with us!</p>
      <p>Best regards,<br>Fruitnest</p>`;

    await sendEmail(email, subject, html);
    return res.status(200).json(updatedData);
  } catch (error) {
    console.log("Error in updating order by ID", error);
  }
};

const deleteOrderById = async (req, res) => {
  try {
    const id = req.params.id;
    await Order.deleteOne({ _id: id });
    return res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    console.log("Error in deleting order by ID", error);
  }
};

module.exports = {
  getAllOrders,
  getOrderById,
  deleteOrderById,
  updateOrderById,
};