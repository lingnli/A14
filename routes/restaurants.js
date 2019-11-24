const express = require("express");
const router = express.Router();
const Restaurant = require("../models/restaurant");
const { authenticated } = require("../config/auth.js");

router.get("/", authenticated, (req, res) => {
  res.redirect("/");
});

//新增頁面需排在瀏覽詳細頁面之前，否則再連接到/restaurants/new之前會先跑到/restaurants/:id
//新增
router.get("/new", authenticated, (req, res) => {
  res.render("new");
});
router.post("/", authenticated, (req, res) => {
  console.log(req.body);
  const restaurant = new Restaurant({
    name: req.body.name,
    rating: req.body.rating,
    category: req.body.category,
    image: req.body.image,
    location: req.body.location,
    phone: req.body.phone,
    description: req.body.description,
    //建立user跟restaurant關聯後，需把userId丟到restaurant document中
    userId: req.user._id
  });
  restaurant.save(err => {
    if (err) return console.log(err);
    res.redirect("/");
  });
});

//瀏覽詳細
router.get("/:id", authenticated, (req, res) => {
  console.log(req.params.id);
  Restaurant.findById(
    { _id: req.params.id, userId: req.user._id },
    (err, restaurant) => {
      if (err) return console.log(err);
      console.log(restaurant);
      return res.render("detail", { restaurant });
    }
  );
});
//修改：get 取得要修改的資料丟到修改頁面
router.get("/:id/edit", authenticated, (req, res) => {
  Restaurant.findById(
    { _id: req.params.id, userId: req.user._id },
    (err, restaurant) => {
      if (err) return console.log(err);
      return res.render("edit", { restaurant });
    }
  );
});
//送出修改動作：修改後的資料存到Restaurant model中
router.put("/:id", authenticated, (req, res) => {
  console.log(req.body);
  Restaurant.findById(
    { _id: req.params.id, userId: req.user._id },
    (err, restaurant) => {
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
    }
  );
});
//刪除動作
router.delete("/:id/delete", authenticated, (req, res) => {
  Restaurant.findById(
    { _id: req.params.id, userId: req.user._id },
    (err, restaurant) => {
      if (err) return console.log(err);
      restaurant.remove(err => {
        if (err) return console.log(err);
        return res.redirect("/");
      });
    }
  );
});

module.exports = router;
