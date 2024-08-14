const Gallery = require("../models/gallery-model");

const getAllGallery = async (req, res) => {
  try {
    const gallery = await Gallery.find({});
    if (!gallery || gallery.length === 0) {
      return res.status(404).json({ message: "No gallery found" });
    }
    return res.status(200).json(gallery);
  } catch (error) {
    console.log("Error in getting gallery", error);
  }
};

const addGalleryItem = async (req, res) => {
  try {
    const imagePath = req.file ? `/SliderImages/${req.file.filename}` : "";

    const newGalleryItem = new Gallery({
      path: imagePath,
    });

    await newGalleryItem.save();
    res.status(201).json({ message: "Gallery item added successfully" });
  } catch (error) {
    console.error("Error adding gallery item", error);
    res.status(500).json({ message: "Error adding gallery item" });
  }
};

const deleteGalleryById = async (req, res) => {
  try {
    const id = req.params.id;
    await Gallery.deleteOne({ _id: id });
    return res
      .status(200)
      .json({ message: "Gallery item deleted successfully" });
  } catch (error) {
    console.log("Error in deleting gallery item by ID", error);
  }
};

module.exports = {
  getAllGallery,
  deleteGalleryById,
  addGalleryItem,
};
