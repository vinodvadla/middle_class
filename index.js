require("module-alias/register");
require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const { sequelize } = require("./src/models");
const routes = require("./src/routes");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("static", "./uploads");
app.get("/", (req, res, next) => {
  res.send("Hello World!");
});

app.use("/v1", routes);

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({ success: false, message: err.message });
});
sequelize.sync({ alter: false }).then(() => {
  app.listen(PORT, () => {
    console.log("Server Running at http://localhost:" + PORT);
  });
});
