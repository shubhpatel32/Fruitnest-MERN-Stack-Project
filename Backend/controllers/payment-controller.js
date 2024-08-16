const Razorpay = require("razorpay");
const crypto = require("crypto");
const Order = require("../models/order-model");

const initiatePayment = async (req, res) => {
  const razorpayInstance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });

  try {
    const { orderId } = req.body;
    const order = await Order.findById(orderId);

    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }

    const options = {
      amount: order.amount * 100, // Razorpay expects amount in paise
      currency: "INR",
      receipt: `receipt_order_${orderId}`,
    };
    const razorpayOrder = await razorpayInstance.orders.create(options);

    res.json({
      success: true,
      razorpayOrder,
    });
  } catch (error) {
    console.error("Error in initiatePayment", error);
    res
      .status(500)
      .json({ success: false, message: "Error initiating payment" });
  }
};

const verifyPayment = async (req, res) => {
  const { paymentId, orderId, signature } = req.body;

  try {
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${paymentId}|${orderId}`)
      .digest("hex");

    if (expectedSignature === signature) {
      // Update order payment status in the database
      await Order.findByIdAndUpdate(orderId, {
        "payment.status": "Paid",
      });

      res.json({ success: true, message: "Payment verified successfully" });
    } else {
      res.status(400).json({ success: false, message: "Invalid signature" });
    }
  } catch (error) {
    console.error("Error verifying payment", error);
    res
      .status(500)
      .json({ success: false, message: "Error verifying payment" });
  }
};

module.exports = { initiatePayment, verifyPayment };
