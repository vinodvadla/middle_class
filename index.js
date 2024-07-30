require("module-alias/register");
require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const { sequelize } = require("./src/models");
const routes = require("./src/routes");
const cors = require("cors");
const { client: RedisClient } = require("./src/services/redis");

const corsOptions = {
  origin: ["*"],
};

app.use(cors(corsOptions));
app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  console.log(`Received ${req.method} request for ${req.url}`);
  console.log("Body:", req.body);
  next();
});
app.get("/", (req, res, next) => {
  res.send("Hello World!");
});

app.use("/v1", routes);

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({ success: false, message: err.message });
});

RedisClient.connect().then(() => {
  console.log("REDIS CONNECTED");
});
sequelize.sync({ alter: false }).then(() => {
  app.listen(PORT, () => {
    console.log("Server Running at http://localhost:" + PORT);
  });
});
