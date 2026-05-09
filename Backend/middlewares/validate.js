const { body, query, validationResult } = require("express-validator");


const handleValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(422).json({ success: false, errors: errors.array() });
  next();
};

const validateAddSchool = [
  body("name")
    .trim()
    .notEmpty().withMessage("Name is required")
    .isLength({ max: 255 }).withMessage("Name must be ≤ 255 characters"),

  body("address")
    .trim()
    .notEmpty().withMessage("Address is required")
    .isLength({ max: 500 }).withMessage("Address must be ≤ 500 characters"),

  body("latitude")
    .notEmpty().withMessage("Latitude is required")
    .isFloat({ min: -90, max: 90 }).withMessage("Latitude must be between -90 and 90"),

  body("longitude")
    .notEmpty().withMessage("Longitude is required")
    .isFloat({ min: -180, max: 180 }).withMessage("Longitude must be between -180 and 180"),

  handleValidation,
];

const validateListSchools = [
  query("latitude")
    .notEmpty().withMessage("Latitude query param is required")
    .isFloat({ min: -90, max: 90 }).withMessage("Latitude must be between -90 and 90"),

  query("longitude")
    .notEmpty().withMessage("Longitude query param is required")
    .isFloat({ min: -180, max: 180 }).withMessage("Longitude must be between -180 and 180"),

  handleValidation,
];

module.exports = { validateAddSchool, validateListSchools };