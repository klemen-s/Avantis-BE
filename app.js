require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const Product = require("./models/Product");

const app = express();

app.get("/", (req, res) => {
  res.json({ message: "Hello World" });
});

// Test route for saving products to db
// app.get("/save-product", async (req, res) => {
//   const product = new Product({
//     name: "Leather Boots",
//     price: 99.99,
//     imageUrl:
//       "https://www.allsaints.com/dw/image/v2/BHHD_PRD/on/demandware.static/-/Sites-allsaints-emea-master-catalog/default/dwec632f9d/images/large/MF561Z/5/MF561Z-5-1.jpg?q=80",
//   });

//   const savedProduct = await product.save();

//   console.log("Product saved");
//   res.json({ product: savedProduct });
// });

try {
  mongoose
    .connect(
      `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.xyukcbr.mongodb.net/${process.env.MONGO_STORE}`
    )
    .then((result) => {
      console.log("Connection established");
      app.listen(8000);
    })
    .catch((err) => {
      console.log("Connection failed");
    });
} catch (error) {
  console.log(error);
}
