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
const connectDb = require("./utils/db");
const errorMiddleware = require("./middlewares/error-middleware");
const seed = require("./utils/index");

const corsOptions = {
  // origin: "https://fruitnest.vercel.app",
  origin: "http://localhost:3000",
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

app.use(errorMiddleware);

const PORT = 5000;
connectDb().then(() => {
  app.listen(PORT, (req, res) => {
    console.log(`server is running on ${PORT}`);
    // seed.seedFruits();
  });
});
