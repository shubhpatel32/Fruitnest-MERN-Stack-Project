const Fruit = require("../models/fruit-model");

const getAllFruits = async (req, res) => {
  try {
    const fruits = await Fruit.find({}).sort({ stock: 1 });
    if (!fruits || fruits.length === 0) {
      return res.status(404).json({ message: "No fruits found" });
    }
    return res.status(200).json(fruits);
  } catch (error) {
    console.log("Error in getting fruits", error);
  }
};

const addFruit = async (req, res) => {
  try {
    const { name, price, discount, stock } = req.body;
    const imagePath = `Images/${req.file.filename}`;

    const newFruit = new Fruit({
      name,
      price,
      discount,
      stock,
      image: imagePath,
    });

    await newFruit.save();
    res.status(201).json({ message: "Fruit added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to add the fruit" });
  }
};

const getFruitById = async (req, res) => {
  try {
    const fruit = await Fruit.findById(req.params.id);
    if (!fruit) return res.status(404).json({ message: "Fruit not found" });
    res.json(fruit);
  } catch (error) {
    console.log("Error in getting fruit", error);
  }
};

const updateFruitById = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const updatedFruit = await Fruit.findByIdAndUpdate(
      id,
      { $set: updatedData },
      { new: true }
    );

    if (!updatedFruit) {
      return res.status(404).json({ message: "Fruit not found" });
    }
    res.status(200).json(updatedFruit);
  } catch (error) {
    console.log("Error in updating fruit", error);
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
  updateFruitById,
  getFruitById,
  addFruit,
};
