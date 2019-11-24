//login, register, logout route
const express = require("express");
const router = express.Router();
//載入User Model
const User = require("../models/user");
const passport = require("passport");
//載入bcrypt
const bcrypt = require("bcrypt");

//login
router.get("/login", (req, res) => {
  res.render("login");
});
//執行login action
router.post("/login", (req, res, next) => {
  console.log(req.body);
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/users/login"
  })(req, res, next);
});

//register
router.get("/register", (req, res) => {
  res.render("register");
});
router.post("/register", (req, res) => {
  console.log(req.body);
  const { name, email, password, password2 } = req.body;
  //加入錯誤提示訊息，使用connect-flash
  let errors = [];
  if (!name || !email || !password || !password2) {
    errors.push({ msg: "所有欄位為必填！" });
  }
  if (password !== password2) {
    errors.push({ msg: "二次輸入密碼不相等" });
  }
  if (errors.length > 0) {
    //若有錯誤
    res.render("register", { errors, name, email, password, password2 });
  } else {
    //無錯誤則進入User Model判斷
    User.findOne({ email: email }).then(user => {
      //{{email(User的屬性):email(req.body的email)}}
      if (user) {
        //存在的話停在register頁面保留name,email
        console.log("user's email already exists");
        errors.push({ msg: "email已經註冊過了" });
        res.render("register", { errors, name, email });
      } else {
        //不存在新增user置User model後跳轉restaurants首頁
        const newUser = new User({
          name,
          email,
          password
        });
        //bcrypt加密password=>passport認證也要修改
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            newUser.password = hash;
            newUser
              .save()
              .then(user => {
                res.redirect("/");
              })
              .catch(err => console.log(err));
          });
        });
      }
    });
  }
});

//logout
router.get("/logout", (req, res) => {
  req.logOut();
  req.flash("success_msg", "你已成功登出");
  res.redirect("/");
});

module.exports = router;
