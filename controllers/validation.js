const { validationResult } = require("express-validator");

module.exports.validateResult = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) return next();
  const msgs = errors
    .array()
    .reduce(
      (msg, error, idx) => `${msg}${idx > 0 ? "\n" : ""}${error.msg}`,
      "",
    );
  next(new Error(msgs));
};
