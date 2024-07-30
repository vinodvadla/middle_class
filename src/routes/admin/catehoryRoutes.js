const router = require("express").Router();
const { categoryController } = require("../../controllers/admin");

router.post("/", categoryController.createCategory);
router.put("/:id", categoryController.updateCategory);
router.get("/", categoryController.getAllCategories);
router.get("/:slug", categoryController.getCategoryById);
router.delete("/", categoryController.deleteCategory);

module.exports = router;
