const nodemailer = require("nodemailer");
const Order = require("../models/order-model");
const User = require("../models/user-models");
const Fruit = require("../models/fruit-model");

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

const sendEmail = async (to, subject, html) => {
  try {
    const mailOptions = {
      from: `Fruitnest <${process.env.GMAIL_USER}>`,
      to: to,
      subject: subject,
      html: html,
    };

    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

const cancelOrderFormat = (order) => {
  const { firstname } = order.address;
  return `
  <div>
    <h3>Dear ${firstname},</h3>
    <h3>Your order has been cancelled</h3>
    <p><strong>Order ID:</strong> ${order._id}</p>
    <p><strong>Order Status:</strong> ${order.status}</p>
    <p><strong>Payment:</strong> ${order.payment}</p>
    <p>Your order has been successfully cancelled. If you have any questions, please contact our support team.</p>
  </div>
`;
};

const updateOrderFormat = (order) => {
  const { firstname } = order.address;
  return `
  <div>
    <h3>Dear ${firstname},</h3>
    <h3>Your order status has been updated</h3>
    <p><strong>Order ID:</strong> ${order._id}</p>
    <p><strong>Order Status:</strong> ${order.status}</p>
    <p><strong>Payment:</strong> ${order.payment}</p>
    <p>Your order status has been updated. If you have any questions, please contact our support team.</p>
  </div>
`;
};

const format = (newOrder) => {
  const { firstname } = newOrder.address;

  return `
  <h3>Dear ${firstname},</h3>
  <h3>Your Order Details</h3>
  <p><strong>Order ID:</strong> ${newOrder._id}</p>
  <p><strong>Date:</strong> ${new Date(newOrder.date).toLocaleDateString()}</p>
  <p><strong>Order Status:</strong> ${newOrder.status || "Pending"}</p>
  <p><strong>Payment:</strong> ${newOrder.payment}</p>
  <p><strong>Payment Method:</strong> ${newOrder.paymentMethod}</p>
  <p><strong>Address:</strong></p>
  <p>${newOrder.address.firstname} ${newOrder.address.lastname}</p>
  <p>${newOrder.address.street}, ${newOrder.address.city}, ${
    newOrder.address.state
  } - ${newOrder.address.pincode}</p>
  <p>${newOrder.address.phone}</p>
  <h3>Items:</h3>
  <table border="1" cellpadding="8" cellspacing="0" style="width: 100%; border-collapse: collapse;">
<thead>
  <tr>
    <th>Item</th>
    <th>Price</th>
    <th>Quantity</th>
    <th>Amount</th>
  </tr>
</thead>
<tbody>
  ${newOrder.items
    .map(
      (item) => `
    <tr>
      <td>${item.name}</td>
      <td>&#8377;${item.price}</td>
      <td>${item.quantity} kg</td>
      <td>&#8377;${item.price * item.quantity}</td>
    </tr>
  `
    )
    .join("")}
</tbody>
</table>
  <h3>Total Amount: &#8377;${newOrder.amount}</h3>
`;
};

module.exports = { sendEmail, format, cancelOrderFormat, updateOrderFormat };
