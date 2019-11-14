const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("this will be restaurant list app");
});

app.listen(3000, () => {
  console.log("Restaurant List App is running!");
});
