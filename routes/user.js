//login, register, logout route
const express = require("express");
const router = express.Router();

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
  res.send("register action");
});

//logout
router.post("/logout", (req, res) => {
  res.send("logout action");
  res.redirect("/");
});

module.exports = router;
