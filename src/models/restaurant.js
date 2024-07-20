"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Restaurant extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.Category, {
        foreignKey: "categoryId",
        as: "categories",
        through: models.RestaurantCategory,
      });

      this.hasMany(models.Media, {
        foreignKey: "refId",
        as: "images",
        constraints: false,
      });
    }
  }
  Restaurant.init(
    {
      name: DataTypes.STRING,
      city: DataTypes.STRING,
      address: DataTypes.STRING,
      status: {
        type: DataTypes.ENUM(["Active", "InActive"]),
        defaultValue: "Active",
      },
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      mobile: DataTypes.STRING,
      descrition: {
        type: DataTypes.TEXT,
      },
      slug: {
        type: DataTypes.STRING,
        unique: true,
        validate: {
          isLowercase: true,
        },
      },
    },
    {
      sequelize,
      modelName: "Restaurant",
    }
  );
  return Restaurant;
};
