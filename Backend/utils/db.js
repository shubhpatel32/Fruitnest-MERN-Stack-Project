const mongoose = require("mongoose");

const URI = process.env.MONGODB_URI;

// mongoose.connect(URI);

const connectDb = async () => {
  try {
    await mongoose.connect(URI);
    console.log("DB connected successfully");
  } catch (err) {
    console.error("DB connection unsuccessful");
    process.exit(0);
  }
};

module.exports = connectDb;
