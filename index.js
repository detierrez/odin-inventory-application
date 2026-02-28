require("./utils/loadEnv");
const express = require("express");
const methodOverride = require("method-override");

const itemsRouter = require("./routes/items");
const indexRouter = require("./routes/index");

const app = express();

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(
  methodOverride(function (req, res) {
    if (req.body && typeof req.body === "object" && "_method" in req.body) {
      return req.body._method;
    }
  }),
);

app.use("/", indexRouter);
app.use("/items", itemsRouter);
// app.use("/", (err, req, res, next) => res.render("404"));

const PORT = process.env.PORT;
app.listen(
  PORT,
  console.log(`Listening...
    check http://localhost:${PORT}`),
);
