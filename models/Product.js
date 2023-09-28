const { Schema, model } = require("mongoose");

const productSchema = new Schema({
  name: String,
  price: Number,
  imageUrl: String,
  forGender: String,
});

module.exports = new model("product", productSchema);
