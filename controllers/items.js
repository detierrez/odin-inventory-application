const db = require("../db/queries");
const { validateItemId, validateItemArguments } = require("./validation/items");

module.exports.getItems = async (req, res, next) => {
  const items = await db.getAllItems();
  res.render("boilerplate", { view: "index", items });
};

module.exports.getItem = [validateItemId, fetchItemWithCategories, renderItem];

module.exports.getNewItem = [
  fetchAllCategories,
  makeItemForTemplate,
  renderItemForm,
];

module.exports.postItem = [
  validateItemArguments,
  async (req, res, next) => {
    if (res.locals.hasErrors) return next();

    const { sku, stock, price, name, brand, description } = req.body;
    await db.createItem(sku, stock, price, name, brand, description);
    res.redirect("/");
  },
  fetchAllCategories,
  makeItemForTemplate,
  renderItemForm,
];

module.exports.getEditItem = [
  validateItemId,
  fetchItemWithCategoriesIds,
  fetchAllCategories,
  makeItemForTemplate,
  renderItemForm,
];

module.exports.updateItem = [
  validateItemId,
  validateItemArguments,
  async (req, res, next) => {
    if (res.locals.hasErrors) return next();

    const { id } = req.params;
    const { sku, stock, price, name, brand, description, categoriesIds } =
      req.body;

    await db.updateItem({ id, sku, stock, price, name, brand, description });
    await db.updateItemCategories(id, categoriesIds);
    res.redirect(`/items/${id}`);
  },
  fetchAllCategories,
  makeItemForTemplate,
  renderItemForm,
];

module.exports.deleteItem = [
  validateItemId,
  async (req, res, next) => {
    const { id } = req.params;
    await db.deleteItem(id);
    res.redirect("/");
  },
];

async function fetchItemWithCategories(req, res, next) {
  const { id } = req.params;
  const [item, categories] = await Promise.all([
    db.getItem(id),
    db.getCategoriesByItem(id),
  ]);
  item.categories = categories;
  res.locals.item = item;
  next();
}

async function fetchItemWithCategoriesIds(req, res, next) {
  const { id } = req.params;
  const [item, categoriesIds] = await Promise.all([
    db.getItem(id),
    db.getCategoriesIdsByItem(id),
  ]);
  item.categoriesIds = categoriesIds;
  res.locals.item = item;
  next();
}

async function makeItemForTemplate(req, res, next) {
  if (res.locals.item) next();
  const { id } = req.params;
  let { sku, stock, price, name, brand, description, categoriesIds } =
    req.body || {};
  price = isNaN(price) ? "" : price;
  categoriesIds = categoriesIds ? categoriesIds : [];

  res.locals.item = {
    id,
    sku,
    stock,
    price,
    name,
    brand,
    description,
    categoriesIds,
  };
  next();
}

async function fetchAllCategories(req, res, next) {
  res.locals.allCategories = await db.getAllCategories();
  next();
}

function renderItem(req, res) {
  res.render("boilerplate", { view: "item" });
}

function renderItemForm(req, res) {
  res.render("boilerplate", { view: "itemForm" });
}
