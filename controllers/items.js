const { param, matchedData } = require("express-validator");
const db = require("../db/queries");
const { validateResult } = require("./validation");

module.exports.getItems = async (req, res, next) => {
  const items = await db.getAllItems();
  res.render("boilerplate", { view: "items", items });
};

module.exports.postItem = async (req, res, next) => {
  const { sku, qty, price, name, brand, description } = {
    sku: "0123456789AB",
    qty: 12,
    price: 23,
    name: "LOL",
    brand: "LMAOO",
    description: "ROLF",
  };
  await db.createItem(sku, qty, price, name, brand, description);
};

module.exports.getItem = [
  param("id").isInt().withMessage("id must be an integer"),
  validateResult,
  async (req, res, next) => {
    const { id } = matchedData(req);
    const item = await db.getItem(id);
    const categories = await db.getCategoriesByItem(id);
    res.render("boilerplate", { view: "item", item, categories });
  },
];
