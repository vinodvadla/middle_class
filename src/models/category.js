"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      this.hasMany(models.SubCategory, {
        foreignKey: "categoryId",
        as: "subcategories",
      });
    }
  }

  Category.init(
    {
      image: DataTypes.STRING,
      name: DataTypes.STRING,
      status: {
        type: DataTypes.ENUM(["Active", "InActive"]),
        defaultValue: "Active",
      },
      slug: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isLowercase: true,
        },
      },
    },
    {
      sequelize,
      modelName: "Category",
    }
  );
  return Category;
};
