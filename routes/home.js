const express = require("express");
const router = express.Router();
const Restaurant = require("../models/restaurant");

router.get("/", (req, res) => {
  Restaurant.find((err, restaurants) => {
    if (err) return console.log(err);
    res.render("index", { restaurants });
  });
});

module.exports = router;
