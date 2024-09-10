const router = require("express").Router();
const categoryRoutes = require("./categoryRoutes");
router.use("/category", categoryRoutes);
module.exports = router;
