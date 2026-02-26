const { Router } = require("express");
const controller = require("../controllers/items");

const router = Router();

router.get("/", controller.getItems);
router.post("/", controller.postItem);
router.get("/:id", controller.getItem);

module.exports = router;
