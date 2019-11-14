const mongoose = require("mongoose");
const Restaurant = require("../restaurant");
const restaurantSample = require("./restaurant.json");

mongoose.connect("mongodb://localhost/restaurant", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", () => {
  console.log("mongodb error");
});

db.once("open", () => {
  console.log("mongodb connected!");
  const data = restaurantSample.results;
  for (var i = 0; i < data.length; i++) {
    Restaurant.create(data[i]);
  }

  console.log("done");
});
