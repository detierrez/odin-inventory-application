const db = require("../db/queries");
const {
  validateItemId,
  validateItemArguments,
  attachValidated,
} = require("./validation");

module.exports.getItems = async (req, res, next) => {
  const items = await db.getAllItems();
  res.render("boilerplate", { view: "items", items });
};

module.exports.postItem = async (req, res, next) => {
  const { sku, stock, price, name, brand, description } = {
    sku: "12345678",
    stock: 12,
    price: 23,
    name: "LOL",
    brand: "LMAOO",
    description: "ROLF",
  };
  await db.createItem(sku, stock, price, name, brand, description);
};

module.exports.getItem = [
  validateItemId,
  attachValidated,
  fetchItemWithCategories,
  renderItem,
];

module.exports.getNewItem = [
  makeItemForTemplate,
  fetchAllCategories,
  renderItemForm,
];

module.exports.getEditItem = [
  validateItemId,
  attachValidated,
  makeItemForTemplate,
  fetchAllCategories,
  renderItemForm,
];

module.exports.updateItem = [
  validateItemId,
  validateItemArguments,
  attachValidated,
  async (req, res, next) => {
    if (res.locals.hasErrors) return next();

    const { id, sku, stock, price, name, brand, description, categoriesIds } =
      res.locals.validated;

    await db.updateItem({ id, sku, stock, price, name, brand, description });
    await db.updateItemCategories(id, categoriesIds);
    res.redirect(`/items/${res.locals.validated.id}`);
  },
  makeItemForTemplate,
  fetchAllCategories,
  renderItemForm,
];

module.exports.deleteItem = [
  validateItemId,
  attachValidated,
  async (req, res, next) => {
    const { id } = res.locals.validated;
    await db.deleteItem(id);
    res.redirect("/");
  },
];

async function fetchItemWithCategories(req, res, next) {
  const { id } = res.locals.validated;
  const [item, categories] = await Promise.all([
    db.getItem(id),
    db.getCategoriesByItem(id),
  ]);
  item.categories = categories;
  res.locals.item = item;
  next();
}

async function fetchItemWithCategoriesIds(req, res, next) {
  const { id } = res.locals.validated;
  const [item, categoriesIds] = await Promise.all([
    db.getItem(id),
    db.getCategoriesIdsByItem(id),
  ]);
  item.categoriesIds = categoriesIds;
  res.locals.item = item;
  next();
}

async function makeItemForTemplate(req, res, next) {
  const { id } = req.params;
  const { sku, stock, price, name, brand, description } = req.body;

  res.locals.item = { id, sku, stock, price, name, brand, description };
  res.locals.item.categoriesIds = res.locals.validated.categoriesIds;
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
