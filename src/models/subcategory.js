"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class SubCategory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Attribute, {
        foreignKey: "parentId",
        as: "attributes",
      });

      this.belongsTo(models.Category, {
        foreignKey: "categoryId",
        as: "category",
      });
    }
  }
  SubCategory.init(
    {
      name: DataTypes.STRING,
      status: DataTypes.ENUM(["Active", "InActive"]),
      categoryId: DataTypes.INTEGER,
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
      modelName: "SubCategory",
    }
  );
  return SubCategory;
};
