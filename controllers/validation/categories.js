const { param, body } = require("express-validator");
const { raiseErrors, attachErrors } = require("./common");

module.exports.validateId = [param("id").isInt(), raiseErrors];

module.exports.validateName = [
  body("name").exists({ values: "falsy" }).isLength({ max: 32 }),
  attachErrors,
];
