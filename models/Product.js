const { Schema, model } = require("mongoose");

const productSchema = new Schema({
  name: String,
  price: Number,
  imageUrl: String,
});

module.exports = new model("product", productSchema);