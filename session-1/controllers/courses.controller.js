const Course = require("../models/courses.model");
const { validationResult } = require("express-validator");
const { ERROR, FAIL, SUCCES } = require("../utils/httpStatusText");
const asyncWraper = require("../middleware/asyncWraper");
const appError = require("../utils/appError");
const getAllCourses = asyncWraper(async (req, res) => {
  // Query Params
  let { limit, page } = req.query;
  limit = limit || 5;
  page = page || 1;
  const courses = await Course.find({}, { __v: false })
    .limit(limit)
    .skip((page - 1) * limit);
  return res.status(200).json({ status: SUCCES, data: { courses } });
});
const createCourse = asyncWraper(async (req, res, next) => {
  const err = validationResult(req);
  if (!err.isEmpty()) {
    const error = appError.create(err.array(), 400, FAIL);
    return next(error);
  }
  const newCourse = new Course(req.body);
  await newCourse.save();
  return res.status(201).json({ status: SUCCES, data: { newCourse } });
});

const getCourse = asyncWraper(async (req, res, next) => {
  const { id } = req.params;
  const course = await Course.findById(id);
  if (!course) {
    const error = appError.create("Course not found", 400, FAIL);
    return next(error);
  }
  return res.status(200).json({ status: SUCCES, data: { course } });
});
const updateCourse = asyncWraper(async (req, res, next) => {
  const { id } = req.params;

  const course = await Course.findByIdAndUpdate(
    id,
    { $set: req.body },
    {
      new: true,
    }
  );

  if (!course) {
    const error = appError.create("course not found", 400, FAIL);
    return next(error);
  }

  return res.status(201).json({ status: SUCCES, data: { course } });
});

const deleteCourse = asyncWraper(async (req, res, next) => {
  const { id } = req.params;
  const data = await Course.findByIdAndDelete({ _id: id });
  if (!data) {
    const error = appError.create("course not found", 400, FAIL);
    return next(error);
  }
  return res.status(200).json({ status: SUCCES, data: null });
});

module.exports = {
  getAllCourses,
  createCourse,
  updateCourse,
  getCourse,
  deleteCourse,
};
