require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const authRoute = require("./router/auth-router");
const reviewRoute = require("./router/review-router");
const blogRoute = require("./router/blog-router");
const galleryRoute = require("./router/gallery-router");
const connectDb = require("./utils/db");
const errorMiddleware = require("./middlewares/error-middleware");
const seed = require("./utils/index");

const corsOptions = {
  origin: "http://localhost:3000",
  method: "GET,POST,PUT,DELETE,PATCH,HEAD",
  credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api", reviewRoute);
app.use("/api", blogRoute);
app.use("/api", galleryRoute);

app.use(errorMiddleware);

const PORT = 5000;
connectDb().then(() => {
  app.listen(PORT, (req, res) => {
    console.log(`server is running on ${PORT}`);
    seed.seedGallery();
  });
});
