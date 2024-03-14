'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class product extends Model {
    static associate({kategori, transaction}) {
      this.belongsTo(kategori, {foreignKey : "kategori_id"}),
      this.hasMany(transaction, {foreignKey: "product_id"})
    }
  }
  product.init({
    nama_product: DataTypes.STRING,
    description: DataTypes.STRING,
    image_product: DataTypes.STRING,
    harga: DataTypes.INTEGER,
    file: DataTypes.STRING,
    status: DataTypes.ENUM("active", "inactive"),
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: new Date(),
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: new Date(),
    },
  }, {
    sequelize,
    modelName: 'product',
  });
  return product;
};