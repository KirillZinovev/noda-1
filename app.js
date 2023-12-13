const express = require("express");
const favicon = require("express-favicon");
const fs = require("fs");
const path = require("path");
const { nextTick } = require("process");
const ejs = require("ejs");
const session = require("express-session");

const app = express();
const myRoutes = require("./routers/index_routers");
const userSession = require("./middleware/user_session");
const port = "3000";

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

const filePath = path.join(__dirname, "tmp", "1.txt");

// fs.writeFile(filePath, `Сервер запущен. Порт: ${port}`, (err) => {
//   if (err) console.error(err);
//   console.log("файл создан");
// });

// function logger(port, router) {
//   fs.appendFile(
//     filePath,
//     `\nЛогируем ping по адресу localhost:${port}${router}. Время: ${new Date()}`,
//     (err) => {
//       if (err) console.error(err);
//       console.log("файл переписан");
//     }
//   );
// }

// console.log(app.get("env"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "css")));
app.use(express.static(path.join(__dirname, "views")));

app.use(
  session({
    secret: "aboba",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(
  "/css/bootstrap.css",
  express.static(
    path.join(
      __dirname,
      "public/css/bootstrap-5.3.2/dist/css/bootstrap.min.css"
    )
  )
);

app.use(favicon(__dirname + "/public/favicon.png"));
app.use(userSession);
app.use(myRoutes);

app.listen(port, () => {
  console.log(`listen on port ${port}`);
});
app.get("env") == "production";
console.log(app.get("env"));
if (app.get("env") == "production") {
  app.use((req, res, err) => {
    res.status(err.status);
    res.sendFile(err.message);
  });
}
//ERROR HANDLER
app.use((req, res, next) => {
  const err = new Error("Could't get path");
  err.status = 404;
  next(err);
});

if (app.get("env") != "development") {
  app.use(function (err, req, res, next) {
    console.log(err.status, err.message);
    res.status = 404;
    link = "https://centralsib.com/media/gallery/kukushka.jpg";
    res.render("error.ejs", { err, link });
  });
} else {
  app.use(function (err, req, res, next) {
    console.log(app.get("env"), err.status, err.message);
  });
}

// kjsdhkdsh
