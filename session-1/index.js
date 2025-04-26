const express = require("express");
const morgan = require("morgan");
const path = require("path");
const ConnectDb = require("./config");
const { ERROR } = require("./utils/httpStatusText");
const cors = require("cors");
const routerCourses = require("./routes/courses.routes");
const routerUsers = require("./routes/users.routes");
const app = express();
// vid==>8
ConnectDb();

// NPM MORGAN --> Logger
app.use(morgan("dev"));
app.use(cors());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(express.json());
app.use("/api/v1/courses", routerCourses);
app.use("/api/v1/users", routerUsers);
app.use("*", (req, res) => {
  return res.status(404).json({ status: ERROR, message: "Not Found" });
});

// =========global error handler=============
app.use((err, req, res, next) => {
  console.log(err.statusCode);
  return res
    .status(err.statusCode || 500)
    .json({ status: err.statusText || ERROR, message: err.message });
});
app.listen(5000, () => {
  console.log("Server Runing");
});
