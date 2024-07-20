"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Media extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Restaurant, {
        foreignKey: "refId",
        as: "restaurant",
        scope: {
          refType: "Restaurant",
        },
        constraints: false,
      });
    }
  }
  Media.init(
    {
      file_name: DataTypes.STRING,
      url: DataTypes.STRING,
      refId: DataTypes.INTEGER,
      refType: {
        type: { type: DataTypes.ENUM(["Restaurant"]) },
      },
    },
    {
      sequelize,
      modelName: "Media",
    }
  );
  return Media;
};
