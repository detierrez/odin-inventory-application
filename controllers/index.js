const { query, matchedData } = require("express-validator");
const db = require("../db/queries");
const { validateResult } = require("./validation");

module.exports.getIndex = [
  query("catId").optional().isInt().withMessage("id must be an integer"),
  validateResult,
  async (req, res, next) => {
    res.locals.categories = await db.getAllCategories();
    next();
  },
  async (req, res, next) => {
    const { catId } = matchedData(req);
    if (catId) {
      res.locals.items = await db.getItemsByCategory(catId);
    } else {
      res.locals.items = await db.getAllItems();
    }
    next();
  },
  async (req, res, next) => {
    const items = res.locals.items;
    await Promise.all(
      items.map(async (item) => {
        item.categories = await db.getCategoriesByItem(item.id);
      }),
    );
    next();
  },
  async (req, res) => {
    res.render("index");
  },
];
