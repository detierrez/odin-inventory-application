require("./utils/loadEnv");
const express = require("express");

const itemsRouter = require("./routes/items");
const indexRouter = require("./routes/index");

const app = express();

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));

app.use("/", indexRouter);
app.use("/items", itemsRouter);
// app.use("/", (err, req, res, next) => res.render("404"));

const PORT = process.env.PORT;
app.listen(
  PORT,
  console.log(`Listening...
    check http://localhost:${PORT}`),
);
