const mongoose = require("mongoose");

const gallerySchema = new mongoose.Schema({
  path: {
    type: String,
    required: true,
  },
});

const Gallery = new mongoose.model("Gallery", gallerySchema);
module.exports = Gallery;
