const { Schema, model } = require("mongoose");

const orderSchema = new Schema({
  orderItems: [],
  userId: { type: Schema.Types.ObjectId, ref: "user" },
});

module.exports = new model("order", orderSchema);
