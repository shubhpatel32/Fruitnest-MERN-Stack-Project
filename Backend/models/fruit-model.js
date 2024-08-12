const mongoose = require("mongoose");

const fruitSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  discount: {
    type: Number,
    default: 0,
  },
  stock: {
    type: Number,
    required: true,
    min: 0,
  },
});

const Fruit = new mongoose.model("Fruit", fruitSchema);
module.exports = Fruit;
