const express = require("express");
const router = express.Router();
const register = require("../controllers/register");
const entries = require("../controllers/entries");

// router.get("/register", function (req, res) {
//   res.render("register.ejs");
// });
// router.post("/register", function (req, res) {});

// router.get("/login", login.form);
// router.post("/login", login.submit);

router.get("/", entries.list);
// router.post("/entry", entry.?);

router.get("/login", function (req, res) {
  res.render("login.ejs");
});
router.post("/login", function (req, res) {});

router.get("/test", function (req, res) {
  res.end("/test");
});
router.post("/test", function (req, res) {
  console.log("Прошли по пути post/test");
  res.end("post/test");
});
module.exports = router;
