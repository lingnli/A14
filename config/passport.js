//設定passport middleware，來判斷各路由是否已登入
const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
// 載入 User model
const User = require("../models/user");
const bcrypt = require("bcrypt");
module.exports = passport => {
  //判斷是否登入
  passport.use(
    new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
      User.findOne({ email: email }, function(err, user) {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false, { message: "The email is not registered!" });
        }
        //password已被bcrypt，使用bcrypt.compare()
        bcrypt.compare(password, user.password, (err, res) => {
          if (err) throw err; //若錯誤丟出err:false
          if (res) {
            //若有比對到則res:true
            //成功登入回傳user(User Model中比對email找到的user)
            return done(null, user);
          } else {
            return done(null, false, { message: "wrong password/email" });
          }
        });
      });
    })
  );

  //session的序列化及反序列化
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });
};
