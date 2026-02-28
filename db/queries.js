const format = require("pg-format");
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

module.exports.createItem = async ({
  sku,
  stock,
  price,
  name,
  brand,
  description,
}) => {
  console.log({ sku, stock, price, name, brand, description });
  await pool.query(
    `
    INSERT INTO items
      (sku, stock, price, name, brand, description)
    VALUES
      ($1, $2, $3, $4, $5, $6);
    `,
    [sku, stock, price, name, brand, description],
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

module.exports.updateItem = async ({
  id,
  sku,
  stock,
  price,
  name,
  brand,
  description,
}) => {
  await pool.query(
    `
    UPDATE items
    SET
    sku=$2,
    stock=$3,
    price=$4,
    name=$5,
    brand=$6,
    description=$7
    WHERE items.id=$1;
    `,
    [id, sku, stock, price, name, brand, description],
  );
};

module.exports.deleteItem = async (id) => {
  await pool.query(
    `
    DELETE FROM items
    WHERE items.id=$1;
    `,
    [id],
  );
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

module.exports.getCategoriesIdsByItem = async (id) => {
  const { rows } = await pool.query(
    `
    SELECT category_id
    FROM assignments
    WHERE item_id=$1;
    `,
    [id],
  );
  return rows.map((row) => row.category_id);
};

module.exports.updateItemCategories = async (itemId, categoriesIds) => {
  await pool.query(
    `
    DELETE FROM assignments
    WHERE item_id=$1;
    `,
    [itemId],
  );

  if (categoriesIds.length > 0) {
    const pairs = categoriesIds.map((categoryId) => [itemId, categoryId]);
    await pool.query(
      format(
        `
    INSERT INTO assignments
      (item_id, category_id)
    VALUES
      %L;
    `,
        pairs,
      ),
    );
  }
};

`
    INSERT INTO items
      (sku, stock, price, name, brand, description)
    VALUES
      ('ASD', 12, 'asd', 'aaa', 'bbb', 'ccc');
    `;
