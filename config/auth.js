//確保各個route的登入狀態
module.exports = {
  authenticated: (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }
    req.flash("warning_msg", "請先登入才可使用！");
    res.redirect("/users/login");
  }
};
//middleware中authenticated方法
