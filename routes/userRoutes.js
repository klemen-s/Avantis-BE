const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

router.post("/register", async (req, res, next) => {
  try {
    console.log(req.body);

    if (req.body === undefined) {
      const err = new Error("Data missing.");
      err.name = "REQ_ERROR";
      err.statusCode = 404;
      throw err;
      }
      
    // Check for duplicate E-Mail
    const email = req.body.email;

    const dbEmail = await User.findOne({ email: email });

    if (dbEmail) {
      const err = new Error("E-Mail already exists.");
      err.name = "DUPLICATED_ERROR";
      err.statusCode = 409;
      throw err;
    }

    const name = req.body.name;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;

    if (password !== confirmPassword) {
      const err = new Error("Passwords do not match.");
      err.name = "INPUT_ERROR";
      err.statusCode = 400;
      throw err;
    }

    // hash password
    const hash = await bcrypt.hash(password, 12);

    const newUser = new User({
      name: name,
      email: email,
      password: hash,
    });

    await newUser.save();

    res.json({ Message: "Succesfull registration." });
  } catch (error) {
    next(error);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const clientEmail = req.body.email;

    const dbUser = await User.findOne({ email: clientEmail });

    if (!dbUser) {
      const err = new Error("E-Mail does not exist.");
      err.name = "INPUT_ERROR";
      err.statusCode = 404;
      throw err;
    }

    const match = await bcrypt.compare(req.body.password, dbUser.password);

    let jsonwebtoken;

    if (match) {
      jsonwebtoken = jwt.sign(
        {
          exp: Math.floor(Date.now() / 1000) + 60 * 60,
          data: { isAuthenticated: true },
        },
        process.env.PRIVATE_KEY
      );
    }

    res.json({ jwt: jsonwebtoken });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
