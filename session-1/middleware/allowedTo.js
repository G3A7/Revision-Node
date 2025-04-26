const appError = require("../utils/appError");
const { FAIL } = require("../utils/httpStatusText");

function allowedTo(role) {
  return (req, res, next) => {
    console.log(req.currentUser);
    if (!req.currentUser.role == role) {
      next(appError.create("not Authorized", 400, FAIL));
    }
    next();
  };
}

module.exports = allowedTo;
