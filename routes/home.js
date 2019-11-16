const express = require("express");
const router = express.Router();
const Restaurant = require("../models/restaurant");

router.get("/", (req, res) => {
  Restaurant.find((err, restaurants) => {
    if (err) return console.log(err);
    res.render("index", { restaurants });
  });
});
//搜尋功能
router.get("/search", (req, res) => {
  console.log(req.query.search);
  const regex = new RegExp(req.query.search, "i");
  Restaurant.find(
    {
      $or: [{ name: regex }, { name_en: regex }, { category: regex }]
    },
    (err, restaurants) => {
      if (err) return console.log(err);
      res.render("index", { restaurants });
    }
  );
});

/*models.find說明
models.find(x1,x2=>{call back function})
x1：比對尋找的內容 為object
x2：(err,item) 錯誤及回傳值
*/

module.exports = router;
