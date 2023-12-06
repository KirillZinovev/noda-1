const User = require("../models/user");
exports.form = (req, res) => {
  res.render(`register`, {});
};
exports.submit = (req, res, next) => {
  User.findByEmail(req.body.dataForm.email, (err, user) => {
    const email = req.body.user.email;

    if (!user) {
      User.create(req.body.user, (err) => {
        if (err) return next(err);
      });
    }
    res.error("Пользователь с таким email уже существует");
    res.redirect("/");
  });
};
