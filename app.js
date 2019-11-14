const express = require("express");
const app = express();
const mongoose = require("mongoose");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const Restaurant = require("./models/restaurant.js");

//handlebars setting
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

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
  res.render("index");
});
app.get("/restaurants", (req, res) => {
  res.redirect("/");
});
//新增頁面需排在瀏覽詳細頁面之前，否則再連接到/restaurants/new之前會先跑到/restaurants/:id
//新增
app.get("/restaurants/new", (req, res) => {
  res.send("新增頁面");
});
app.post("/restaurants/new", (req, res) => {
  res.send("新增動作");
});
//瀏覽詳細
app.get("/restaurants/:id", (req, res) => {
  res.send("詳細id頁面");
});
//修改
app.get("/restaurants/:id/edit", (req, res) => {
  res.send("修改頁面");
});
app.post("/restaurants/:id/edit", (req, res) => {
  res.send("修改動作");
});
//刪除
app.post("/restaurants/:id/delete", (req, res) => {
  res.send("刪除id頁面動作");
});

app.listen(3000, () => {
  console.log("Restaurant List App is running!");
});
