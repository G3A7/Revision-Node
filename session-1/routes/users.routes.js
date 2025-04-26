const express = require("express");
const {
  register,
  getAllUsers,
  login,
} = require("../controllers/users.controller");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    const filename = Date.now() + "." + file.mimetype.split("/")[1];
    cb(null, filename);
  },
});
const upload = multer({ storage });
const verifyToken = require("../middleware/verifyToken");
const router = express.Router();
router.route("/").get(verifyToken, getAllUsers);
router.route("/register").post(upload.single("avatar"), register);
router.route("/login").post(login);

module.exports = router;
