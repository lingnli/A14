const express = require("express");
const app = express();
const mongoose = require("mongoose");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const Restaurant = require("./models/restaurant.js");

//static file
app.use(express.static("public"));
//handlebars setting
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//body-parser setting
app.use(bodyParser.urlencoded({ extended: true }));

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

//route
app.get("/", (req, res) => {
  Restaurant.find((err, restaurants) => {
    if (err) return console.log(err);
    res.render("index", { restaurants });
  });
});
app.get("/restaurants", (req, res) => {
  res.redirect("/");
});

//新增頁面需排在瀏覽詳細頁面之前，否則再連接到/restaurants/new之前會先跑到/restaurants/:id
//新增
app.get("/restaurants/new", (req, res) => {
  res.render("new");
});
app.post("/restaurants", (req, res) => {
  console.log(req.body);
  const restaurant = new Restaurant({
    name: req.body.name,
    rating: req.body.rating,
    category: req.body.category,
    image: req.body.image,
    location: req.body.location,
    phone: req.body.phone,
    description: req.body.description
  });
  restaurant.save(err => {
    if (err) return console.log(err);
    res.redirect("/");
  });
});

//瀏覽詳細
app.get("/restaurants/:id", (req, res) => {
  console.log(req.params.id);
  Restaurant.findById(req.params.id, (err, restaurant) => {
    if (err) return console.log(err);
    console.log(restaurant);
    return res.render("detail", { restaurant });
  });
});
//修改：get 取得要修改的資料丟到修改頁面
app.get("/restaurants/:id/edit", (req, res) => {
  Restaurant.findById(req.params.id, (err, restaurant) => {
    if (err) return console.log(err);
    return res.render("edit", { restaurant });
  });
});
//送出修改動作：修改後的資料存到Restaurant model中
app.post("/restaurants/:id/edit", (req, res) => {
  console.log(req.body);
  Restaurant.findById(req.params.id, (err, restaurant) => {
    if (err) return console.log(err);
    restaurant.name = req.body.name;
    restaurant.rating = req.body.rating;
    restaurant.category = req.body.category;
    restaurant.image = req.body.image;
    restaurant.location = req.body.location;
    restaurant.phone = req.body.phone;
    restaurant.description = req.body.description;

    restaurant.save(err => {
      if (err) return console.log(err);
      res.redirect(`/restaurants/${req.params.id}`);
    });
  });
});
//刪除動作
app.post("/restaurants/:id/delete", (req, res) => {
  Restaurant.findById(req.params.id, (err, restaurant) => {
    if (err) return console.log(err);
    restaurant.remove(err => {
      if (err) return console.log(err);
      return res.redirect("/");
    });
  });
});

app.listen(3000, () => {
  console.log("Restaurant List App is running!");
});
