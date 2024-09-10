const express = require("express");
const { sequelize } = require("./src/models");
const app = express();
const routes = require("./src/routes");

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/v1", routes);
app.get("/", (req, res) => {
  res.send("server running");
});
sequelize.sync({ alter: false }).then(() => {
  app.listen(PORT, () => {
    console.log("server running on 3000");
  });
});
