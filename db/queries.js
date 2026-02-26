const pool = require("./pool");

module.exports.getAllItems = async () => {
  const { rows } = await pool.query(
    `
    SELECT * 
    FROM items;
    `,
  );
  return rows;
};

module.exports.createItem = async (
  sku,
  qty,
  price,
  name,
  brand,
  description,
) => {
  await pool.query(
    `
    INSERT INTO employees
      (sku, qty, price, name, brand, description)
    VALUES
      ($1, $2, $3, $4, $5, $6);
    `,
    [sku, qty, price, name, brand, description],
  );
};

module.exports.getItem = async (id) => {
  const { rows } = await pool.query(
    `
    SELECT *
    FROM items
    WHERE items.id=$1;
    `,
    [id],
  );
  return rows[0];
};

module.exports.getItemsByCategory = async (id) => {
  const { rows } = await pool.query(
    `
    SELECT *
    FROM items, assignments
    WHERE items.id = item_id
      AND category_id=$1;
    `,
    [id],
  );
  return rows;
};

module.exports.getAllCategories = async () => {
  const { rows } = await pool.query(
    `
    SELECT *
    FROM categories
    `,
  );
  return rows;
};

module.exports.getCategoriesByItem = async (id) => {
  const { rows } = await pool.query(
    `
    SELECT *
    FROM assignments, categories
    WHERE category_id = categories.id
      AND item_id=$1;
    `,
    [id],
  );
  return rows;
};
