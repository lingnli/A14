const mongoose = require("mongoose");
const Restaurant = require("../restaurant");
const restaurantSample = require("./restaurant.json");
const userSample = require("./users.json");
const User = require("../../models/user");

mongoose.connect("mongodb://localhost/restaurant", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

const db = mongoose.connection;

db.on("error", () => {
  console.log("mongodb error");
});

db.once("open", () => {
  console.log("mongodb connected!");
  const data = restaurantSample.results;
  const user = userSample.results;
  //從json新增種子資料到restaurant model
  const newUser = new User({
    name: "test",
    email: user[0].email,
    password: user[0].password
  });
  newUser.save().then(user => {
    for (let i = 0; i < data.length; i++) {
      Restaurant.create({
        name: data[i].name,
        rating: data[i].rating,
        category: data[i].category,
        image: data[i].image,
        location: data[i].location,
        phone: data[i].phone,
        description: data[i].description,
        //建立user跟restaurant關聯後，需把userId丟到restaurant document中
        userId: user._id
      });
    }
  });

  console.log("done");
});
