const { Router } = require("express");
const controller = require("../controllers/items");

const router = Router();

router.get("/", controller.getItems);
router.post("/", controller.postItem);
router.get("/new", controller.getNewItem);
router.get("/:id", controller.getItem);
router.get("/:id/edit", controller.getEditItem);
router.patch("/:id", controller.updateItem);
router.delete("/:id", controller.deleteItem);

module.exports = router;
