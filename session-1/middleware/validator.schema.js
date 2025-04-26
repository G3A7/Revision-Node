const { body } = require("express-validator");

const CreateValidator = [
  body("name")
    .notEmpty()
    .withMessage("Required 😁")
    .isLength({ min: 3 })
    .withMessage("At least 3 char 😁"),
  body("price").notEmpty().withMessage("Required 😁"),
];

module.exports = CreateValidator;

// runValidators: true,
