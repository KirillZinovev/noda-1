const User = require("../models/user");
exports.form = (req, res) => {
  res.render(`register`, {});
};
exports.submit = (req, res, next) => {
  const email = req.body.user.email;

  if(!Игорь в базе данных есть?)
  User.create(req.body.user, cb);
};
