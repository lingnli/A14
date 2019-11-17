const express = require("express");
const router = express.Router();
const Restaurant = require("../models/restaurant");

router.get("/", (req, res) => {
  Restaurant.find((err, restaurants) => {
    if (err) return console.log(err);
    res.render("index", { restaurants });
  });
});
//排序
router.get("/sort/:sort", (req, res) => {
  console.log(req.params.sort);
  const option = {};
  if (req.params.sort === "name-asc") {
    option.name = "asc";
  } else if (req.params.sort === "name-desc") {
    option.name = "desc";
  } else if (req.params.sort === "rating-desc") {
    option.rating = "desc"; //desc:高到低
  } else if (req.params.sort === "rating-asc") {
    option.rating = "asc"; //asc:低到高
  }
  console.log(option);

  Restaurant.find({})
    .sort(option)
    .exec((err, restaurants) => {
      if (err) return console.log(err);
      return res.render("index", { restaurants });
    });
});

//中文排序？

//搜尋功能
router.get("/search", (req, res) => {
  console.log(req.query.search);
  const regex = new RegExp(req.query.search, "i");
  Restaurant.find((err, restaurants) => {
    if (err) return console.log(err);
    const searchItem = restaurants.filter(
      item =>
        item.name.match(regex) ||
        item.name_en.match(regex) ||
        item.category.match(regex)
    );
    console.log(searchItem);
    res.render("index", { restaurants: searchItem });
  });
});

/*另一種寫法
models.find(x1,x2=>{call back function})
x1：比對尋找的內容 為object
x2：(err,item) 錯誤及回傳值
 Restaurant.find(
    {
      $or: [{ name: regex }, { name_en: regex }, { category: regex }]
    },
    (err, restaurants) => {
      if (err) return console.log(err);
      res.render("index", { restaurants });
    }
  );
*/

module.exports = router;
