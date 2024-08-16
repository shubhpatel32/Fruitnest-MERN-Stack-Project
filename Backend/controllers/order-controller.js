const Order = require("../models/order-model");
const crypto = require("crypto");
const User = require("../models/user-models");
const Fruit = require("../models/fruit-model");
const moment = require("moment");

const { sendEmail, format, cancelOrderFormat } = require("../utils/sendEmail");

const Razorpay = require("razorpay");

const placeOrder = async (req, res) => {
  try {
    const { paymentMethod, amount, userId, items, address } = req.body;
    const newOrderData = {
      userId,
      items,
      amount,
      address,
      payment: "Unpaid",
      paymentMethod,
    };

    for (let i = 0; i < items.length; i++) {
      console.log("order Items", items[i]);
      const fruit = await Fruit.findById(items[i]._id);

      if (fruit) {
        const newStock = fruit.stock - items[i].quantity;
        await Fruit.findByIdAndUpdate(
          { _id: items[i]._id },
          { stock: newStock }
        );
      }
    }

    if (paymentMethod === "Razorpay") {
      const razorpay = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_KEY_SECRET,
      });

      const options = {
        amount: req.body.amount * 100,
        currency: "INR",
        receipt: `order_rcptid_${Math.floor(Math.random() * 1000000)}`,
      };

      const razorpayOrder = await razorpay.orders.create(options);
      newOrderData.razorpayOrderId = razorpayOrder.id;
      const newOrder = new Order(newOrderData);
      await newOrder.save();

      res.json({
        success: true,
        orderId: razorpayOrder.id,
        amount: razorpayOrder.amount,
      });
    } else {
      const newOrder = new Order(newOrderData);
      await newOrder.save();
      await User.findByIdAndUpdate(userId, { cartData: {} });
      const { email } = newOrder.address;
      const subject = "Order Confirmation";
      const html = format(newOrder);
      await sendEmail(email, subject, html);
      res.json({
        success: true,
        message: "Order placed successfully with Cash on Delivery!",
      });
    }
  } catch (error) {
    console.log("Error in placeOrder", error);
    res.status(500).json({ success: false, message: "Error placing order" });
  }
};

const cancelOrder = async (req, res) => {
  try {
    const { orderId } = req.body;

    const order = await Order.findById(orderId);

    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found." });
    }

    const { items } = order;
    for (let i = 0; i < items.length; i++) {
      console.log("order Items", items[i]);
      const fruit = await Fruit.findById(items[i]._id);

      if (fruit) {
        const newStock = fruit.stock + items[i].quantity;
        await Fruit.findByIdAndUpdate(
          { _id: items[i]._id },
          { stock: newStock }
        );
      }
    }

    if (order.payment === "Paid") {
      order.payment = "Refunded";
      await order.save();
    }
    order.status = "Cancelled";
    await order.save();

    const { email } = order.address;
    const subject = "Order Cancelled";
    const html = cancelOrderFormat(order);
    await sendEmail(email, subject, html);

    res.json({ success: true, message: "Order cancelled successfully." });
  } catch (error) {
    console.error("Error canceling order:", error);
    res.status(500).json({ success: false, message: "Error canceling order." });
  }
};

const showOrder = async (req, res) => {
  try {
    const userId = req.user._id;
    const orders = await Order.find({ userId: userId })
      .populate("userId")
      .sort({ date: -1 });

    const formattedOrders = orders.map((order) => ({
      ...order.toObject(),
      date: moment(order.date).format("Do MMM, YYYY [at] h:mm A"),
    }));

    res.status(200).json(formattedOrders);
  } catch (error) {
    console.error("Error fetching user orders:", error);
    res.status(500).json({ success: false, message: "Server error." });
  }
};

const verifyPayment = async (req, res) => {
  try {
    const { razorpayPaymentId, razorpayOrderId, razorpaySignature } = req.body;

    const body = razorpayOrderId + "|" + razorpayPaymentId;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    if (expectedSignature === razorpaySignature) {
      const order = await Order.findOne({ razorpayOrderId });

      if (!order) {
        return res
          .status(404)
          .json({ success: false, message: "Order not found." });
      }

      order.payment = "Paid";
      await order.save();
      await User.findByIdAndUpdate(order.userId, { cartData: {} });
      const newOrder = order;
      const { email } = newOrder.address;
      const subject = "Order Confirmation";
      const html = format(newOrder);
      await sendEmail(email, subject, html);

      res.json({
        success: true,
        message: "Payment verified and order updated.",
      });
    } else {
      res.status(400).json({ success: false, message: "Invalid signature." });
    }
  } catch (error) {
    console.error("Error in payment verification:", error);
    res
      .status(500)
      .json({ success: false, message: "Payment verification failed." });
  }
};

module.exports = { placeOrder, showOrder, verifyPayment, cancelOrder };
