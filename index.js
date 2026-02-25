require("./utils/loadEnv");
const express = require("express");

const employeesRouter = require("./routes/employees");

const app = express();

app.use(express.urlencoded({ extended: true }));


app.use("/employees", employeesRouter);

const PORT = process.env.PORT;
app.listen(
  PORT,
  console.log(`Listening...
    check http://localhost:${PORT}`),
);
