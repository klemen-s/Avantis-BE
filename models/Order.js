const { Schema, model } = require("mongoose");

const orderSchema = new Schema({
  orderItems: [{ type: Schema.Types.ObjectId, ref: "Product" }],
  orderUser: { type: Schema.Types.ObjectId, ref: "User" },
});

module.exports = new model("order", orderSchema);
