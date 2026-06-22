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

const sendAdminEmail = async (subject, html) => {
  const adminEmail = process.env.GMAIL_USER;

  if (!adminEmail) {
    console.warn("Admin email is not configured. Set GMAIL_USER.");
    return;
  }

  await sendEmail(adminEmail, subject, html);
};

const adminUserRegisteredFormat = (user) => {
  return `
  <div style="max-width: 650px; font-size: 16px;">
    <h2 style="font-size: 24px; margin: 0 0 18px;">New User Registration</h2>
    <p style="font-size: 16px; margin: 0 0 18px;">A new customer has registered on Fruitnest.</p>

    <table cellpadding="0" cellspacing="0" style="border-collapse: collapse; width: 100%; font-size: 16px;">
      <tr>
        <td style="border: 1px solid #cccccc; padding: 12px; font-weight: bold; width: 35%;">User ID</td>
        <td style="border: 1px solid #cccccc; padding: 12px;">${user._id}</td>
      </tr>
      <tr>
        <td style="border: 1px solid #cccccc; padding: 12px; font-weight: bold;">Name</td>
        <td style="border: 1px solid #cccccc; padding: 12px;">${user.username}</td>
      </tr>
      <tr>
        <td style="border: 1px solid #cccccc; padding: 12px; font-weight: bold;">Email</td>
        <td style="border: 1px solid #cccccc; padding: 12px;">${user.email}</td>
      </tr>
      <tr>
        <td style="border: 1px solid #cccccc; padding: 12px; font-weight: bold;">Phone</td>
        <td style="border: 1px solid #cccccc; padding: 12px;">${user.phone}</td>
      </tr>
      <tr>
        <td style="border: 1px solid #cccccc; padding: 12px; font-weight: bold;">Registered At</td>
        <td style="border: 1px solid #cccccc; padding: 12px;">${new Date().toLocaleString("en-IN", {
          timeZone: "Asia/Kolkata",
        })}</td>
      </tr>
    </table>

    <p style="margin-top: 20px; color: #666; font-size: 15px;">
      This is an automated notification from Fruitnest.
    </p>
  </div>
`;
};

const adminOrderPlacedFormat = (newOrder) => {
  return `
  <div style="max-width: 650px; font-size: 16px;">
  <h2 style="font-size: 24px; margin: 0 0 18px;">New Order Placed</h2>

  <p style="font-size: 16px; margin: 0 0 18px;">
    A customer has placed a new order on Fruitnest.
  </p>

  <table cellpadding="0" cellspacing="0" style="border-collapse: collapse; width: 100%; font-size: 16px; margin-bottom: 20px;">
    <tr>
      <td style="border: 1px solid #cccccc; padding: 12px; font-weight: bold; width: 35%;">Order ID</td>
      <td style="border: 1px solid #cccccc; padding: 12px;">${newOrder._id}</td>
    </tr>
    <tr>
      <td style="border: 1px solid #cccccc; padding: 12px; font-weight: bold;">Date</td>
      <td style="border: 1px solid #cccccc; padding: 12px;">
        ${new Date(newOrder.date).toLocaleString("en-IN", {
          timeZone: "Asia/Kolkata",
        })}
      </td>
    </tr>
    <tr>
      <td style="border: 1px solid #cccccc; padding: 12px; font-weight: bold;">Status</td>
      <td style="border: 1px solid #cccccc; padding: 12px;">
        ${newOrder.status || "Pending"}
      </td>
    </tr>
    <tr>
      <td style="border: 1px solid #cccccc; padding: 12px; font-weight: bold;">Payment Status</td>
      <td style="border: 1px solid #cccccc; padding: 12px;">
        ${newOrder.payment ? "Paid" : "Pending"}
      </td>
    </tr>
    <tr>
      <td style="border: 1px solid #cccccc; padding: 12px; font-weight: bold;">Payment Method</td>
      <td style="border: 1px solid #cccccc; padding: 12px;">
        ${newOrder.paymentMethod}
      </td>
    </tr>
    <tr>
      <td style="border: 1px solid #cccccc; padding: 12px; font-weight: bold;">Total Amount</td>
      <td style="border: 1px solid #cccccc; padding: 12px;">
        ₹${newOrder.amount}
      </td>
    </tr>
  </table>

  <h3>Customer Details</h3>

  <table cellpadding="0" cellspacing="0" style="border-collapse: collapse; width: 100%; font-size: 16px; margin-bottom: 20px;">
    <tr>
      <td style="border: 1px solid #cccccc; padding: 12px; font-weight: bold; width: 35%;">Name</td>
      <td style="border: 1px solid #cccccc; padding: 12px;">
        ${newOrder.address.firstname} ${newOrder.address.lastname}
      </td>
    </tr>
    <tr>
      <td style="border: 1px solid #cccccc; padding: 12px; font-weight: bold;">Email</td>
      <td style="border: 1px solid #cccccc; padding: 12px;">
        ${newOrder.address.email}
      </td>
    </tr>
    <tr>
      <td style="border: 1px solid #cccccc; padding: 12px; font-weight: bold;">Phone</td>
      <td style="border: 1px solid #cccccc; padding: 12px;">
        ${newOrder.address.phone}
      </td>
    </tr>
    <tr>
      <td style="border: 1px solid #cccccc; padding: 12px; font-weight: bold;">Address</td>
      <td style="border: 1px solid #cccccc; padding: 12px;">
        ${newOrder.address.street}, ${newOrder.address.city}, ${newOrder.address.state} - ${newOrder.address.pincode}
      </td>
    </tr>
  </table>

  <h3>Ordered Items</h3>

  <table cellpadding="0" cellspacing="0" style="border-collapse: collapse; width: 100%; font-size: 16px;">
    <thead>
      <tr>
        <th style="border: 1px solid #cccccc; padding: 12px;">Item</th>
        <th style="border: 1px solid #cccccc; padding: 12px; text-align: right;">Price</th>
        <th style="border: 1px solid #cccccc; padding: 12px; text-align: right;">Quantity</th>
        <th style="border: 1px solid #cccccc; padding: 12px; text-align: right;">Amount</th>
      </tr>
    </thead>
    <tbody>
      ${newOrder.items
        .map(
          (item) => `
        <tr>
          <td style="border: 1px solid #cccccc; padding: 12px;">${item.name}</td>
          <td style="border: 1px solid #cccccc; padding: 12px; text-align: right;">₹${item.price}</td>
          <td style="border: 1px solid #cccccc; padding: 12px; text-align: right;">${item.quantity} kg</td>
          <td style="border: 1px solid #cccccc; padding: 12px; text-align: right;">₹${item.price * item.quantity}</td>
        </tr>
      `
        )
        .join("")}
    </tbody>
    <tfoot>
      <tr>
        <td colspan="3" style="border: 1px solid #cccccc; padding: 12px; font-weight: bold; text-align: right;">Total Amount</td>
        <td style="border: 1px solid #cccccc; padding: 12px; font-weight: bold; text-align: right;">₹${newOrder.amount}</td>
      </tr>
    </tfoot>
  </table>

  <p style="margin-top: 20px; color: #666; font-size: 15px;">
    This is an automated notification from Fruitnest.
  </p>
</div>
`;
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

const forgotPasswordFormat = (username, resetUrl) => {
  return `
  <div>
    <h3>Hi ${username},</h3>
    <p>You requested a password reset. Click the link below to set a new password.</p>
    <p><a href="${resetUrl}" target="_blank" rel="noopener noreferrer">Reset your password</a></p>
    <p>If you did not request this, please ignore this email.</p>
  </div>
`;
};

const format = (newOrder) => {
  const { firstname } = newOrder.address;

  return `
  <div style="max-width: 650px; font-size: 16px;">
    <h1 style="font-size: 24px; margin: 0 0 18px;">Thank you for your order</h1>

    <p style="font-size: 16px; margin: 0 0 18px;">
      Dear ${firstname}, your order has been placed successfully. Here are your order details.
    </p>

    <table cellpadding="0" cellspacing="0" style="border-collapse: collapse; width: 100%; font-size: 16px; margin-bottom: 20px;">
      <tr>
        <td style="border: 1px solid #cccccc; padding: 12px; font-weight: bold; width: 35%;">Order ID</td>
        <td style="border: 1px solid #cccccc; padding: 12px;">${newOrder._id}</td>
      </tr>
      <tr>
        <td style="border: 1px solid #cccccc; padding: 12px; font-weight: bold;">Date</td>
        <td style="border: 1px solid #cccccc; padding: 12px;">
          ${new Date(newOrder.date).toLocaleString("en-IN", {
            timeZone: "Asia/Kolkata",
          })}
        </td>
      </tr>
      <tr>
        <td style="border: 1px solid #cccccc; padding: 12px; font-weight: bold;">Order Status</td>
        <td style="border: 1px solid #cccccc; padding: 12px;">
          ${newOrder.status || "Pending"}
        </td>
      </tr>
      <tr>
        <td style="border: 1px solid #cccccc; padding: 12px; font-weight: bold;">Payment Status</td>
        <td style="border: 1px solid #cccccc; padding: 12px;">
          ${newOrder.payment}
        </td>
      </tr>
      <tr>
        <td style="border: 1px solid #cccccc; padding: 12px; font-weight: bold;">Payment Method</td>
        <td style="border: 1px solid #cccccc; padding: 12px;">
          ${newOrder.paymentMethod}
        </td>
      </tr>
      <tr>
        <td style="border: 1px solid #cccccc; padding: 12px; font-weight: bold;">Total Amount</td>
        <td style="border: 1px solid #cccccc; padding: 12px;">
          ₹${newOrder.amount}
        </td>
      </tr>
    </table>

    <h3>Delivery Details</h3>

    <table cellpadding="0" cellspacing="0" style="border-collapse: collapse; width: 100%; font-size: 16px; margin-bottom: 20px;">
      <tr>
        <td style="border: 1px solid #cccccc; padding: 12px; font-weight: bold; width: 35%;">Name</td>
        <td style="border: 1px solid #cccccc; padding: 12px;">
          ${newOrder.address.firstname} ${newOrder.address.lastname}
        </td>
      </tr>
      <tr>
        <td style="border: 1px solid #cccccc; padding: 12px; font-weight: bold;">Email</td>
        <td style="border: 1px solid #cccccc; padding: 12px;">
          ${newOrder.address.email}
        </td>
      </tr>
      <tr>
        <td style="border: 1px solid #cccccc; padding: 12px; font-weight: bold;">Phone</td>
        <td style="border: 1px solid #cccccc; padding: 12px;">
          ${newOrder.address.phone}
        </td>
      </tr>
      <tr>
        <td style="border: 1px solid #cccccc; padding: 12px; font-weight: bold;">Address</td>
        <td style="border: 1px solid #cccccc; padding: 12px;">
          ${newOrder.address.street}, ${newOrder.address.city}, ${newOrder.address.state} - ${newOrder.address.pincode}
        </td>
      </tr>
    </table>

    <h3>Ordered Items</h3>

    <table cellpadding="0" cellspacing="0" style="border-collapse: collapse; width: 100%; font-size: 16px;">
      <thead>
        <tr>
          <th style="border: 1px solid #cccccc; padding: 12px;">Item</th>
          <th style="border: 1px solid #cccccc; padding: 12px; text-align: right;">Price</th>
          <th style="border: 1px solid #cccccc; padding: 12px; text-align: right;">Quantity</th>
          <th style="border: 1px solid #cccccc; padding: 12px; text-align: right;">Amount</th>
        </tr>
      </thead>
      <tbody>
        ${newOrder.items
          .map(
            (item) => `
          <tr>
            <td style="border: 1px solid #cccccc; padding: 12px;">${item.name}</td>
            <td style="border: 1px solid #cccccc; padding: 12px; text-align: right;">₹${item.price}</td>
            <td style="border: 1px solid #cccccc; padding: 12px; text-align: right;">${item.quantity} kg</td>
            <td style="border: 1px solid #cccccc; padding: 12px; text-align: right;">₹${item.price * item.quantity}</td>
          </tr>
        `
          )
          .join("")}
      </tbody>
      <tfoot>
        <tr>
          <td colspan="3" style="border: 1px solid #cccccc; padding: 12px; font-weight: bold; text-align: right;">Total Amount</td>
          <td style="border: 1px solid #cccccc; padding: 12px; font-weight: bold; text-align: right;">₹${newOrder.amount}</td>
        </tr>
      </tfoot>
    </table>

    <p style="margin-top: 20px; color: #666; font-size: 15px;">
      This is an automated order confirmation from Fruitnest.
    </p>
  </div>
`;
};

module.exports = {
  sendEmail,
  sendAdminEmail,
  format,
  cancelOrderFormat,
  updateOrderFormat,
  forgotPasswordFormat,
  adminUserRegisteredFormat,
  adminOrderPlacedFormat,
};
