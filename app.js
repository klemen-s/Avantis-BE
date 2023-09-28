require("dotenv").config();
const express = require("express");
const { MongoClient, ServerApiVersion } = require("mongodb");

const app = express();

app.get("/", (req, res) => {
  res.json({ message: "Hello World" });
});

async function run() {
  try {
    const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.xyukcbr.mongodb.net/${process.env.MONGO_STORE}`;
    const client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });

    await client.connect();

    app.listen(8000);
  } catch (error) {
    console.log(error);
  }
}

run();
