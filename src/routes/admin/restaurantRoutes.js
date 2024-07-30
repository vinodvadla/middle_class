const router = require("express").Router();
const { restaurantController } = require("../../controllers/admin");
const { validate, restaurantSchema } = require("../../utils/validator");
const upload = require("../../services/multer");
router.get("/", restaurantController.getAll);
router.get("/:slug", restaurantController.getBySlug);
router.post("/", restaurantController.create);
router.put("/:slug", restaurantController.update);
router.delete("/:slug", restaurantController.deleteRest);
module.exports = router;
