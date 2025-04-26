const jwt = require("jsonwebtoken");
const { FAIL } = require("../utils/httpStatusText");
const appError = require("../utils/appError");
const verifyToken = (req, res, next) => {
  const authHeader =
    req.headers["Authorization"] || req.headers["authorization"];
  if (!authHeader) {
    const error = appError.create("token Required", 400, FAIL);
    return next(error);
  }
  const token = authHeader.split(" ")[1];
  try {
    const currentUser = jwt.verify(token, process.env.JWTSECRETKEY);
    req.currentUser = currentUser;
    next();
  } catch (err) {
    const error = appError.create("invalid Token", 401, FAIL);
    return next(error);
  }
};

module.exports = verifyToken;
