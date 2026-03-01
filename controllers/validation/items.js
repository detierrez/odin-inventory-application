const { param, query, body } = require("express-validator");
const { attachErrors, raiseErrors } = require("./common");

module.exports.validateCategoryId = [
  query("catId").optional().isInt().withMessage("id must be an integer"),
  raiseErrors,
];

module.exports.validateItemId = [
  param("id").isInt().withMessage("id must be an integer"),
  raiseErrors,
];

module.exports.validateItemArguments = [
  body("sku")
    .trim()
    .matches(/^[A-Z0-9]+$/)
    .withMessage("SKU must contain numbers or uppercase letters only")
    .isLength({ min: 8, max: 8 })
    .withMessage("SKU must contain exactly 8 characters"),
  body("stock")
    .isInt({ min: 0 })
    .withMessage("Stock must be a positive integer"),
  body("price")
    .exists({ values: "falsy" })
    .withMessage("Price is obligatory")
    .toFloat()
    .isFloat({ min: 0 })
    .withMessage("Price must be a positive number")
    .isFloat({ max: 99_999_999.99 })
    .withMessage("Price can't be greater than 99,999,999.99"),
  body("name")
    .trim()
    .exists({ values: "falsy" })
    .withMessage("Name is required")
    .isLength({ max: 64 })
    .withMessage("Name must not exceed 64 characters"),
  body("brand")
    .trim()
    .isLength({ max: 64 })
    .withMessage("Brand must not exceed 64 characters"),
  body("description")
    .trim()
    .isLength({ max: 1024 })
    .withMessage("Description must not exceed 1024 characters"),
  body("categoriesIds")
    .customSanitizer((value) => {
      if (Array.isArray(value)) {
        return value.map(Number);
      } else if (value) {
        return [Number(value)];
      }
      return [];
    })
    .custom((array) => {
      return array.every(Number.isInteger);
    })
    .withMessage("Categories must be an array of strings"),
  attachErrors,
];
