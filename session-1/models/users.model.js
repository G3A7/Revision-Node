const mongoose = require("mongoose");
// علي مستوي ال model
const validator = require("validator");
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [validator.isEmail, "must be Email"],
    // validate: {
    //   validator: (v) => {
    //     return /[a-zA-Z]+/.test(v);
    //   },
    //   message: () => "",
    // },
  },
  password: {
    type: String,
    required: true,
  },
  token: {
    type: String,
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
  avatar: {
    type: String,
    default: "uploads/me1.jpg",
  },
});

module.exports = mongoose.model("User", userSchema);
