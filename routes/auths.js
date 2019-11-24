//facebook strategy設定
//http://localhost:3000/auths/...
const express = require("express");
const router = express.Router();
const passport = require("passport");

router.get(
  "/facebook",
  passport.authenticate("facebook", { scope: ["email", "public_profile"] })
  //scope為驗證時，提示會從facebook獲得的data
);

router.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: "/",
    failureRedirect: "/users/login"
  })
);

module.exports = router;
