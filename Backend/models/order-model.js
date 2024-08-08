const { Schema, model } = require("mongoose");

const orderSchema = new Schema({
  userId: { type: String, required: true },
  items: { type: Array, required: true },
  amount: { type: Number, required: true },
  address: { type: Object, required: true },
  status: { type: String, default: "Success" },
  date: { type: Date, default: Date.now() },
  payment: { type: Boolean, default: false },
});

const Order = new model("Order", orderSchema);

module.exports = Order;
