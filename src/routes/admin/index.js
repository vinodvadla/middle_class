const router = require("express").Router();
const restaurantRoter = require("./restaurantRoutes");

router.use("/restaurant", restaurantRoter);

module.exports = router;
