"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class kategori extends Model {
    static associate({ product }) {
      this.hasMany(product, { foreignKey: "kategori_id" });
    }
  }
  kategori.init(
    {
      nama_kategori: DataTypes.STRING,
      status: DataTypes.ENUM("active", "inactive"),
      kategori_image: DataTypes.STRING,
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: new Date(),
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: new Date(),
      },
    },
    {
      sequelize,
      modelName: "kategori",
    }
  );
  return kategori;
};
