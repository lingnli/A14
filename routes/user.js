//login, register, logout route
const express = require("express");
const router = express.Router();
//載入User Model
const User = require("../models/user");

//login
router.get("/login", (req, res) => {
  res.render("login");
});
router.post("/login", (req, res) => {
  res.send("login action");
});

//register
router.get("/register", (req, res) => {
  res.render("register");
});
router.post("/register", (req, res) => {
  console.log(req.body);
  const { name, email, password, password2 } = req.body;
  User.findOne({ email: email }).then(user => {
    //{{email(User的屬性):email(req.body的email)}}
    if (user) {
      //存在的話停在register頁面保留name,email
      console.log("user's email already exists");
      res.render("register", { name, email });
    } else {
      //不存在新增user置User model後跳轉restaurants首頁
      const newUser = new User({
        name,
        email,
        password
      });
      newUser
        .save()
        .then(user => {
          res.redirect("/");
        })
        .catch(err => console.log(err));
    }
  });
});

//logout
router.post("/logout", (req, res) => {
  res.send("logout action");
  res.redirect("/");
});

module.exports = router;
