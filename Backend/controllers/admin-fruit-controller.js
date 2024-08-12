const Fruit = require("../models/fruit-model");

const getAllFruits = async (req, res) => {
  try {
    const fruits = await Fruit.find({}).sort({ name: 1 });
    if (!fruits || fruits.length === 0) {
      return res.status(404).json({ message: "No fruits found" });
    }
    return res.status(200).json(fruits);
  } catch (error) {
    console.log("Error in getting fruits", error);
  }
};

const deleteFruitById = async (req, res) => {
  try {
    const id = req.params.id;
    await Fruit.deleteOne({ _id: id });
    return res.status(200).json({ message: "Fruit deleted successfully" });
  } catch (error) {
    console.log("Error in deleting fruit by ID", error);
  }
};

module.exports = {
  getAllFruits,
  deleteFruitById,
};
