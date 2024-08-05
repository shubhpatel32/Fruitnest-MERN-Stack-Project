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
});

const Fruit = new mongoose.model("Fruit", fruitSchema);
module.exports = Fruit;
