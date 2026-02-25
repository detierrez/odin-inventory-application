const pool = require("./pool");

module.exports.getAllEmployees = async () => {
  const { rows } = pool.query(`SELECT * FROM employees`);
  return rows;
};

module.exports.createEmployee = async (
  firstname,
  lastname,
  role,
  hire_date,
) => {
  pool.query(
    `
    INSERT INTO employees
      (firstname, lastname, role, hire_date)
    VALUES
      ($1, $2, $3, $4);
  `,
    [firstname, lastname, role, hire_date],
  );
};

module.exports.getEmployee = async (id) => {
  const { rows } = pool.query(`SELECT * FROM employees WHERE id = $1`, [id]);
  return rows[0];
};
