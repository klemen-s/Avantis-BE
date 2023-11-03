const express = require("express");
const router = express.Router();

const Order = require("../models/Order");

router.post("/post-order", async (req, res, next) => {
  try {
    const orderItems = req.body.orderItems;

    const userId = req.body.userId;

    if (!orderItems || !userId) {
      const err = new Error("Missing data from input.");
      err.name = "MISSING_DATA";
      err.statusCode = 404;
      throw err;
    }

    const newOrder = new Order({ userId: userId, orderItems: orderItems });
    await newOrder.save();

    res.json({ message: "Successfully saved order." });
  } catch (error) {
    next(error);
  }
});

router.post("/get-orders", async (req, res, next) => {
  try {
    const userId = req.body.userId;

    if (!userId) {
      const err = new Error("No user with this ID exists.");
      err.name = "USER_DOES_NOT_EXIST";
      err.statusCode = 404;
      throw err;
    }

    const orders = await Order.find({ userId: userId });

    res.json({ orders: orders });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
