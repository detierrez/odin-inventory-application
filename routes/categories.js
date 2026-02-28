const { Router } = require("express");
const controller = require("../controllers/categories");

const router = Router();

router.post("/", controller.createCategory);
router.patch("/:id", controller.updateCategory);
router.delete("/:id", controller.deleteCategory);

module.exports = router;
