const mongoose = require("mongoose");
const coursesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});
const Course = mongoose.model("Course", coursesSchema);
module.exports = Course;
