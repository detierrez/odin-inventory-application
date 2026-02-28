const db = require("../db/queries");
// const {} = require("./validation/categories");

module.exports.createCategory = [
  async (req, res, next) => {
    const { name } = req.body;
    await db.createCategory(name);
    res.redirect("/");
  },
];

module.exports.updateCategory = [
  async (req, res, next) => {
    const { id } = req.params;
    const { name } = req.body;
    await db.updateCategory(id, name);
    res.redirect("/");
  },
];

module.exports.deleteCategory = [
  async (req, res, next) => {
    const { id } = req.params;
    await db.deleteCategory(id);
    res.redirect("/");
  },
];
