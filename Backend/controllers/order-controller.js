const Order = require("../models/order-model");
const crypto = require("crypto");
const User = require("../models/user-models");
const Fruit = require("../models/fruit-model");
const moment = require("moment-timezone");
const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

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
      date: moment(order.date)
        .tz("Asia/Kolkata")
        .format("Do MMM, YYYY [at] h:mm A"),
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

const getInvoice = async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId).populate(
      "userId",
      "username email"
    );

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.setHeader(
      "Content-Disposition",
      `attachment; filename="invoice_${order._id}.pdf"`
    );
    res.setHeader("Content-Type", "application/pdf");

    const doc = new PDFDocument({ margin: 50 });
    doc.pipe(res);

    // Header
    // Title
    doc
      .font("Times-Bold")
      .fontSize(22)
      .fillColor("black")
      .text("Fruitnest Invoice", { align: "center" });
    doc.moveDown(1);

    // Order & Customer Details
    doc.fontSize(14).fillColor("black");

    doc
      .font("Times-Bold")
      .text("Order ID: ", { continued: true })
      .font("Times-Roman")
      .text(order._id);
    doc
      .font("Times-Bold")
      .text("Username: ", { continued: true })
      .font("Times-Roman")
      .text(order.userId.username);
    doc
      .font("Times-Bold")
      .text("Email: ", { continued: true })
      .font("Times-Roman")
      .text(order.userId.email);
    doc
      .font("Times-Bold")
      .text("Order Date: ", { continued: true })
      .font("Times-Roman")
      .text(
        moment(order.date).tz("Asia/Kolkata").format("DD MMM, YYYY [at] h:mm A")
      );

    // **Dynamic Order Status & Payment Details**
    doc
      .font("Times-Bold")
      .text("Order Status: ", { continued: true })
      .font("Times-Roman")
      .text(order.status);
    doc
      .font("Times-Bold")
      .text("Payment: ", { continued: true })
      .font("Times-Roman")
      .text(order.payment);
    doc
      .font("Times-Bold")
      .text("Payment Method: ", { continued: true })
      .font("Times-Roman")
      .text(order.paymentMethod);

    // **Dynamic Address**
    doc.font("Times-Bold").text("Address:");
    doc.font("Times-Roman").text(order.address.street);
    doc
      .font("Times-Roman")
      .text(
        `${order.address.city}, ${order.address.state} - ${order.address.pincode}`
      );
    doc.font("Times-Roman").text(order.address.phone);

    doc.moveDown(1);

    // Table Header
    doc.font("Times-Bold").text("Items:", { underline: true });
    doc.moveDown(0.5);

    const columnWidths = [40, 200, 80, 80, 100];
    const startX = 50;
    let startY = doc.y;

    // Table Column Titles
    doc.font("Times-Bold");
    doc.text("No.", startX, startY, {
      width: columnWidths[0],
      align: "center",
    });
    doc.text("Item", startX + columnWidths[0], startY, {
      width: columnWidths[1],
      align: "center",
    });
    doc.text("Price", startX + columnWidths[0] + columnWidths[1], startY, {
      width: columnWidths[2],
      align: "center",
    });
    doc.text(
      "Qty",
      startX + columnWidths[0] + columnWidths[1] + columnWidths[2],
      startY,
      { width: columnWidths[3], align: "center" }
    );
    doc.text(
      "Total",
      startX +
        columnWidths[0] +
        columnWidths[1] +
        columnWidths[2] +
        columnWidths[3],
      startY,
      { width: columnWidths[4], align: "center" }
    );

    doc.moveDown(0.5);
    doc.font("Times-Roman");

    // Table Rows
    order.items.forEach((item, index) => {
      startY = doc.y;

      doc.text((index + 1).toString(), startX, startY, {
        width: columnWidths[0],
        align: "center",
      });
      doc.text(item.name, startX + columnWidths[0], startY, {
        width: columnWidths[1],
        align: "center",
      });
      doc.text(
        `Rs ${item.price}`,
        startX + columnWidths[0] + columnWidths[1],
        startY,
        { width: columnWidths[2], align: "center" }
      );
      doc.text(
        `${item.quantity} kg`,
        startX + columnWidths[0] + columnWidths[1] + columnWidths[2],
        startY,
        { width: columnWidths[3], align: "center" }
      );
      doc.text(
        `Rs ${item.price * item.quantity}`,
        startX +
          columnWidths[0] +
          columnWidths[1] +
          columnWidths[2] +
          columnWidths[3],
        startY,
        { width: columnWidths[4], align: "center" }
      );

      doc.moveDown(0.5);
    });

    // Total Amount
    doc.moveDown(1);
    doc.x = 50;
    doc
      .font("Times-Bold")
      .fontSize(16)
      .fillColor("#28a745")
      .text(`Total Amount: Rs ${order.amount}`, { align: "center" });

    // Footer
    doc.moveDown(2);
    doc.x = 50;
    doc
      .font("Times-Bold")
      .fontSize(12)
      .fillColor("black")
      .text("Thank you for shopping with Fruitnest!", { align: "center" });

    doc.end();
  } catch (error) {
    console.error("Error generating invoice:", error);
    res.status(500).json({ message: "Error generating invoice" });
  }
};

module.exports = {
  placeOrder,
  showOrder,
  verifyPayment,
  cancelOrder,
  getInvoice,
};
