const Order = require("../models/order-model");
const User = require("../models/user-models");
const sendEmail = require("../utils/sendEmail");

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
    const { email } = newOrder.address;
    const subject = "Order Confirmation";
    const html = `
      <h2>Order Details</h2>
      <p><strong>Order ID:</strong> ${newOrder._id}</p>
      <p><strong>Date:</strong> ${new Date(
        newOrder.date
      ).toLocaleDateString()}</p>
      <p><strong>Order Status:</strong> ${newOrder.status || "Pending"}</p>
      <p><strong>Payment:</strong> ${newOrder.payment ? "Paid" : "Pending"}</p>
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
    await sendEmail(email, subject, html);

    res.json({ success: true, message: "Order Placed" });
  } catch (error) {
    console.log("Error in placeOrder", error);
    res.status(500).json({ success: false, message: "Error" });
  }
};

const showOrder = async (req, res) => {
  try {
    const userId = req.user._id;
    const orders = await Order.find({ userId: userId })
      .populate("userId")
      .sort({ date: -1 });

    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching user orders:", error);
    res.status(500).json({ success: false, message: "Server error." });
  }
};

module.exports = { placeOrder, showOrder };
