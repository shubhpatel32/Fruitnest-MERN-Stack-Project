const Fruit = require("../models/fruit-model");

const getFruit = async (req, res) => {
  try {
    const response = await Fruit.find({}).sort({ name: 1 });

    if (!response) {
      res.status(404).json({ message: "No fruit found" });
      return;
    }
    res.status(200).json(response);
  } catch (error) {
    console.log(`Fruit: ${error}`);
  }
};

module.exports = getFruit;
