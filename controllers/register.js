const User = require("../models/user");
exports.form = (req, res) => {
  res.render(`register`, { title: "Register" });
};
exports.submit = (req, res, next) => {
  User.findByEmail(req.body.email, (err, user) => {
    if (err) return next(err);

    if (!user) {
      console.log("Пользователь с таким email уже существует");
    } else {
      User.create(req.body.user, (err) => {
        if (err) return next(err);
      });
    }
    res.error("Пользователь с таким email уже существует");
    res.redirect("/");
  });
};
