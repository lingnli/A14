//設定passport middleware，來判斷各路由是否已登入
const LocalStrategy = require("passport-local").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const mongoose = require("mongoose");
// 載入 User model
const User = require("../models/user");
const bcrypt = require("bcrypt");
//env
require("dotenv").config();

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

  //facebook第三方登入setting
  passport.use(
    new FacebookStrategy(
      {
        clientID: process.env.FACEBOOK_ID,
        clientSecret: process.env.FACEBOOK_SECRET,
        callbackURL: "http://localhost:3000/auth/facebook/callback",
        profileFields: ["email", "displayName"]
      },
      function(accessToken, refreshToken, profile, done) {
        //比對email在User Model中
        console.log(profile._json); //從facebook傳回的object
        User.findOne({ email: profile._json.email }).then(user => {
          //找不到user則建立new user
          if (!user) {
            //返回data只有profileFields中的name跟email，隨機產生password
            var dummyPassword = Math.random()
              .toString(36)
              .slice(-8);
            //dummyPassword依然需bcrypt
            bcrypt.genSalt(10, (err, salt) => {
              bcrypt.hash(dummyPassword, salt, (err, hash) => {
                if (err) throw err;
                const newUser = User({
                  name: profile._json.name,
                  email: profile._json.email,
                  password: hash
                });
                newUser
                  .save()
                  .then(user => {
                    return done(null, user);
                  })
                  .catch(err => {
                    console.log(err);
                  });
              });
            });
          } else {
            //已有比對到對應user
            return done(null, user);
          }
        });
      }
    )
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
