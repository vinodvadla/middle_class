"use strict";
const { Model } = require("sequelize");
const subcategory = require("./subcategory");
module.exports = (sequelize, DataTypes) => {
  class Attribute extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.SubCategory, {
        foreignKey: "parentId",
        as: "subcategory",
      });
    }
  }

  Attribute.init(
    {
      parentId: DataTypes.INTEGER,
      name: DataTypes.STRING,
      type: DataTypes.ENUM(["number", "text"]),
    },
    {
      sequelize,
      modelName: "Attribute",
    }
  );
  return Attribute;
};
