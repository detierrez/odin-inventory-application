// const { body, query, validationResult } = require("express-validator");
const db = require("../db/queries");

module.exports.getEmployees = async (req, res, next) => {
  return await db.getAllEmployees();
};

module.exports.postEmployee = async (req, res, next) => {
  const { firstname, lastname, role, hire_date } = {
    firstname: "John",
    lastname: "Dow",
    role: "Janitor",
    hire_date: new Date(),
  };
  await db.createEmployee(firstname, lastname, role, hire_date);
};

module.exports.getEmployee = async (req, res, next) => {
  const id = 0;
  return await db.getEmployee(id);
};
