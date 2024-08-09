const { Schema, model } = require("mongoose");
const User = require("./user-models");

const orderSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  items: { type: Array, required: true },
  amount: { type: Number, required: true },
  address: { type: Object, required: true },
  status: { type: String, default: "Pending" },
  date: { type: Date, default: Date.now() },
  payment: { type: Boolean, default: true },
});

const Order = new model("Order", orderSchema);

module.exports = Order;
