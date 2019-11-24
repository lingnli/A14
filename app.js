const express = require("express");
const app = express();
const mongoose = require("mongoose");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const Restaurant = require("./models/restaurant.js");
const methodOverride = require("method-override");
const router = express.Router();
const session = require("express-session");

//sessiongk setting
app.use(
  session({
    secret: "mySecretKey",
    resave: false, //每次跟server互動都更新session=>沒必要 false
    saveUninitialized: true, //將新的session存到session store
    cookie: { secure: true }
  })
);

//method-override setting:當url有_method?=DELETE/PUT時觸發
app.use(methodOverride("_method"));

//static file
app.use(express.static("public"));

//handlebars setting
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//body-parser setting
app.use(bodyParser.urlencoded({ extended: true }));

//mongoose setting
mongoose.connect("mongodb://localhost/restaurant", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;
db.on("error", () => {
  console.log("mongodb error!");
});
db.once("open", () => {
  console.log("mongodb connected!");
});

//route:將router分出去
//當路由結尾是/時，去./routes/home找相關路由
app.use("/", require("./routes/home"));
//當路由結尾是/restaurants時，去./routes/restaurants找相關路由
app.use("/restaurants", require("./routes/restaurants"));
//登入、註冊、登出路由
app.use("/users", require("./routes/user"));

app.listen(3000, () => {
  console.log("Restaurant List App is running!");
});
