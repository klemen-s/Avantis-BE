const { Schema, model } = require("mongoose");

const productSchema = new Schema({
  name: String,
  price: String,
  imageUrl: String,
  gender: String,
  size: [String],
});

module.exports = new model("product", productSchema);
