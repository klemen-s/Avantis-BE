require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");
const orderRoutes = require("./routes/orderRoutes");

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use(userRoutes);
app.use(productRoutes);
app.use(orderRoutes);

app.use((error, req, res, next) => {
  const statusCode = error.statusCode || 500;
  const errorType = error.type;

  switch (errorType) {
    case "EMAIL_ERROR": {
      return res
        .status(statusCode)
        .json({ emailError: error.message, name: error.name });
    }
    case "PASSWORD_ERROR": {
      return res
        .status(statusCode)
        .json({ passwordError: error.message, name: error.name });
    }
    default:
      return res
        .status(statusCode)
        .json({ message: error.message, name: error.name });
  }
});

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.xyukcbr.mongodb.net/${process.env.MONGO_STORE}`
  )
  .then(() => {
    app.listen(8000);
  })
  .catch((error) => {
    error.name = "CONNECITON_FAILED";
    error.statusCode = 500;
    throw error;
  });
