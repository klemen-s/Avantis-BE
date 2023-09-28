const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Product = require("../models/Product");

router.get("/get-products", async (req, res, next) => {
  try {
    const products = await Product.findById("asčdlfjhsaf");

    res.json({ products: products });
  } catch (error) {
    const err = new Error("Failed to find product or products.");
    err.name = "QUERY_ERROR";
    err.statusCode = 404;
    next(err);
  }
});

module.exports = router;
