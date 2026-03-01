const db = require("../db/queries");
const { validateId, validateName } = require("./validation/categories");

module.exports.createCategory = [
  validateName,
  async (req, res, next) => {
    if (!res.locals.hasErrors) {
      const { name } = req.body;
      await db.createCategory(name);
    }
    res.redirect("/");
  },
];

module.exports.updateCategory = [
  validateId,
  validateName,
  async (req, res, next) => {
    if (!res.locals.hasErrors) {
      const { id } = req.params;
      const { name } = req.body;
      await db.updateCategory(id, name);
    }
    res.redirect("/");
  },
];

module.exports.deleteCategory = [
  validateId,
  async (req, res, next) => {
    const { id } = req.params;
    await db.deleteCategory(id);
    res.redirect("/");
  },
];
