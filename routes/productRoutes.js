const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Product = require("../models/Product");

router.get("/get-products", async (req, res, next) => {
  try {
    const gender = req.query.gender;

    if (!gender) {
      const err = new Error("Failed to find product or products.");
      err.name = "QUERY_ERROR";
      err.statusCode = 404;
      throw err;
    }

    const products = await Product.find({ gender: gender });

    if (!products) {
      const err = new Error("Failed to find product or products.");
      err.name = "QUERY_ERROR";
      err.statusCode = 404;
      throw err;
    }

    res.json({ products: products });
  } catch (error) {
    next(err);
  }
});

router.get("/get-product", async (req, res,next) => {
  try {
    const productId = req.query.productId;

    if (!productId) {
      const err = new Error("No product ID provided.");
      err.name = "QUERY_ERROR";
      err.statusCode = 404;
      throw err;
    }

    const product = await Product.findById(productId);

    if (!product) {
      const err = new Error("Failed to find product");
      err.name = "QUERY_ERROR";
      err.statusCode = 404;
      throw err;
    }

    res.json({ product: product });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
