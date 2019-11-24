//確保各個route的登入狀態
module.exports = {
  authenticated: (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect("/users/login");
  }
};
//middleware中authenticated方法
