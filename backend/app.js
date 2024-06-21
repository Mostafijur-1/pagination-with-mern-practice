const express = require("express");
const cors = require("cors");
const app = express();

let db;

app.use(cors());

app.get("/", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 4;

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const results = {};

    const products = await db.collection("products").find().toArray();

    if (endIndex < products.length) {
      results.next = {
        page: page + 1,
      };
    }

    if (startIndex > 0) {
      results.prev = {
        page: page - 1,
      };
    }

    results.totalProducts = products.length;
    results.totalPages = Math.ceil(products.length / limit);
    results.result = products.slice(startIndex, endIndex);

    res.json(results);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

const setDB = (database) => {
  db = database;
};

module.exports = { app, setDB };
