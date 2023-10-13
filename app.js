require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use(userRoutes);
app.use(productRoutes);

app.use((error, req, res, next) => {
  const statusCode = error.statusCode;

  res.status(statusCode).json({ message: error.message, name: error.name });
});

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.xyukcbr.mongodb.net/${process.env.MONGO_STORE}`
  )
  .then((result) => {
    app.listen(8000);
  })
  .catch((error) => {
    error.name = "CONNECITON_FAILED";
    error.statusCode = 500;
    throw error;
  });
