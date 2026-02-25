const { Router } = require("express");
const controller = require("../controllers/employees");

const router = Router();

router.get("/", controller.getEmployees);
router.post("/", controller.postEmployee);
router.get("/:id", controller.getEmployee);

module.exports = router;
