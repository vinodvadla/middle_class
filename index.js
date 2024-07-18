require("module-alias/register");
require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const { sequelize } = require("./src/models");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("static", "./uploads");
app.get("/", (req, res, next) => {
  res.send("Hello World!");
});

sequelize.sync({ alter: false, force: false }).then(() => {
  app.listen(PORT, () => {
    console.log("Server Running at http://localhost:" + PORT);
  });
});
