require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const authRoute = require("./router/auth-router");
const reviewRoute = require("./router/review-router");
const blogRoute = require("./router/blog-router");
const galleryRoute = require("./router/gallery-router");
const cartRoute = require("./router/cart-router");
const fruitRoute = require("./router/fruit-router");
const orderRoute = require("./router/order-router");
const adminUserRoute = require("./router/admin-user-router");
const adminOrderRoute = require("./router/admin-order-router");
const adminFruitRoute = require("./router/admin-fruit-router");
const adminReviewRoute = require("./router/admin-review-router");
const adminBlogRoute = require("./router/admin-blog-router");
const adminGalleryRoute = require("./router/admin-gallery-router");

// const paymentRoute = require("./router/payment-router");
const connectDb = require("./utils/db");
const errorMiddleware = require("./middlewares/error-middleware");
const seed = require("./utils/helper");

const allowedOrigins = {
  development: ["http://localhost:3000"],
  production: ["https://fruitnest.vercel.app"],
};

const env = process.env.NODE_ENV || "development";

const corsOptions = {
  origin: allowedOrigins[env],
  method: "GET,POST,PUT,DELETE,PATCH,HEAD",
  credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/review", reviewRoute);
app.use("/api/blog", blogRoute);
app.use("/api/gallery", galleryRoute);
app.use("/api/fruit", fruitRoute);
app.use("/api/cart", cartRoute);
app.use("/api/order", orderRoute);
// app.use("/api/payment", paymentRoute);
app.use("/api/admin/users", adminUserRoute);
app.use("/api/admin/orders", adminOrderRoute);
app.use("/api/admin/fruits", adminFruitRoute);
app.use("/api/admin/reviews", adminReviewRoute);
app.use("/api/admin/gallery", adminGalleryRoute);
app.use("/api/admin/blogs", adminBlogRoute);

app.use(errorMiddleware);

const PORT = 5000;
connectDb().then(() => {
  app.listen(PORT, (req, res) => {
    console.log(`server is running on ${PORT}`);
    // seed.seedGallery();
  });
});
