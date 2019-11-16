const express = require("express");
const router = express.Router();
const Restaurant = require("../models/restaurant");

router.get("/", (req, res) => {
  res.redirect("/");
});

//新增頁面需排在瀏覽詳細頁面之前，否則再連接到/restaurants/new之前會先跑到/restaurants/:id
//新增
router.get("/new", (req, res) => {
  res.render("new");
});
router.post("/", (req, res) => {
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
router.get("/:id", (req, res) => {
  console.log(req.params.id);
  Restaurant.findById(req.params.id, (err, restaurant) => {
    if (err) return console.log(err);
    console.log(restaurant);
    return res.render("detail", { restaurant });
  });
});
//修改：get 取得要修改的資料丟到修改頁面
router.get("/:id/edit", (req, res) => {
  Restaurant.findById(req.params.id, (err, restaurant) => {
    if (err) return console.log(err);
    return res.render("edit", { restaurant });
  });
});
//送出修改動作：修改後的資料存到Restaurant model中
router.put("/:id", (req, res) => {
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
router.delete("/:id/delete", (req, res) => {
  Restaurant.findById(req.params.id, (err, restaurant) => {
    if (err) return console.log(err);
    restaurant.remove(err => {
      if (err) return console.log(err);
      return res.redirect("/");
    });
  });
});

module.exports = router;
