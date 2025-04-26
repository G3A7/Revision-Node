const CreateValidator = require("../middleware/validator.schema");
const {
  getAllCourses,
  createCourse,
  updateCourse,
  getCourse,
  deleteCourse,
} = require("../controllers/courses.controller");
const express = require("express");
const verifyToken = require("../middleware/verifyToken");
const allowedTo = require("../middleware/allowedTo");

const router = express.Router();

router.route("/").get(getAllCourses).post(CreateValidator, createCourse);
router
  .route("/:id")
  .get(getCourse)
  .put(updateCourse)
  .delete(verifyToken, allowedTo("admin"), deleteCourse);

module.exports = router;
