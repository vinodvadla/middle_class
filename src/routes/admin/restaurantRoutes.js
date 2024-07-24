const router = require("express").Router();
const { restaurantController } = require("../../controllers/admin");
const { validate, restaurantSchema } = require("../../utils/validator");
const upload = require("../../services/multer");
router.post("/",restaurantController.create);

module.exports = router;
