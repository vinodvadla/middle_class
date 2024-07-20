const router = require("express").Router();
const { restaurantController } = require("../../controllers/admin");
const { validate, restaurantSchema } = require("../../utils/validator");
const upload = require("../../services/multer");
router.post(
  "/",
  validate(restaurantSchema),
  upload.single("image"),
  restaurantController.create
);

module.exports = router;
