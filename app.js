const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Restaurant = require("./models/restaurant.js");

//mongoose setting
mongoose.connect("mongodb://localhost/restaurant", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;
db.on("error", () => {
  console.log("mongodb error!");
});
db.once("open", () => {
  console.log("mongodb connected!");
});

app.get("/", (req, res) => {
  res.send("this will be restaurant list app");
});

app.listen(3000, () => {
  console.log("Restaurant List App is running!");
});
