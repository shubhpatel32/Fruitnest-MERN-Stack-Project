const { Schema, model } = require("mongoose");
const User = require("./user-models");

const orderSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  items: { type: Array, required: true },
  amount: { type: Number, required: true },
  address: { type: Object, required: true },
  status: {
    type: String,
    enum: ["Pending", "Delivered", "Cancelled", "Shipped"],
    default: "Pending",
  },
  date: { type: Date, default: Date.now },
  payment: {
    type: String,
    enum: ["Paid", "Unpaid", "Failed", "Refunded"],
    default: "Unpaid",
  },
  paymentMethod: {
    type: String,
    enum: ["Razorpay", "COD"],
    default: "Razorpay",
  },
  razorpayOrderId: { type: String },
});

const Order = model("Order", orderSchema);

module.exports = Order;
