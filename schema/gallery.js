const mongoose = require("mongoose");

const imagesSchema = new mongoose.Schema({
  imgTitle: {
    type: "String",
    required: true,
  },
  imgUrl: {
    type: "String",
    required: true,
  },
});

const ImgGallery = mongoose.model("ImagesGallery ", imagesSchema);
module.exports = ImgGallery;
