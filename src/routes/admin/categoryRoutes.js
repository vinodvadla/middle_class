const router = require("express").Router();
const categoryController = require("../../controllers/admin/CategoryController");

router.post("/", categoryController.createCategory);
router.get("/", categoryController.getAllCategories);

router.get("/:categoryId", categoryController.getCategoryById);
router.put("/:categoryId", categoryController.updateCatgory);

router.delete("/:categoryId", categoryController.deleteCategory);
module.exports = router;
