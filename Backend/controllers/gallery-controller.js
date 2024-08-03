const Gallery = require("../models/gallery-model");

const getPic = async (req, res) => {
  try {
    const response = await Gallery.find();

    if (!response) {
      res.status(404).json({ message: "No image found" });
      return;
    }

    res.status(200).json(response);
  } catch (error) {
    console.log(`Gallery: ${error}`);
  }
};

module.exports = getPic;
