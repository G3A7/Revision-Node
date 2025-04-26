const asyncWraper = require("../middleware/asyncWraper");
const User = require("../models/users.model");
const appError = require("../utils/appError");
const { SUCCES, FAIL, ERROR } = require("../utils/httpStatusText");
const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
const generateToken = require("../utils/generate_jwt");
const getAllUsers = asyncWraper(async (req, res) => {
  // Query Params
  let { limit, page } = req.query;
  limit = limit || 5;
  page = page || 1;
  const users = await User.find({}, { __v: false, password: false })
    .limit(limit)
    .skip((page - 1) * limit);
  return res.status(200).json({ status: SUCCES, data: { users } });
});
const register = asyncWraper(async (req, res, next) => {
  console.log(req.body);
  const { firstName, lastName, email, password } = req.body;
  const fileImage = req.file?.filename;
  console.log(fileImage);
  const oldeUser = await User.findOne({ email });
  if (oldeUser) {
    const error = appError.create("user Already Exists", 400, ERROR);
    return next(error);
  }

  const hashedPass = await bcrypt.hash(password, 10);

  const newUser = new User({
    firstName,
    lastName,
    email,
    password: hashedPass,
    avatar: fileImage,
  });

  const token = await generateToken({
    email: newUser.email,
    id: newUser._id,
    role: newUser.role,
  });
  newUser.token = token;
  await newUser.save();
  return res.status(201).json({ status: SUCCES, data: { newUser } });
});

const login = asyncWraper(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email && !password) {
    const error = appError.create("Email And Password Are Required", 400, FAIL);
    return next(error);
  }
  const user = await User.findOne({ email });

  if (!user) {
    const error = appError.create("User Not Found", 400, ERROR);
    return next(error);
  }
  const matchedPass = await bcrypt.compare(password, user.password);
  if (user && matchedPass) {
    const token = await generateToken({
      email: user.email,
      id: user._id,
      role: user.role,
    });
    // newUser.token = token;
    return res.status(201).json({ status: SUCCES, data: { token } });
  } else {
    const error = appError.create("Something Wrong", 500, ERROR);
    return next(error);
  }
});

module.exports = {
  getAllUsers,
  register,
  login,
};
