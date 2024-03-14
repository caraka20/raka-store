'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class transaction extends Model {
    static associate({product}) {
      this. belongsTo(product, {foreignKey: "product_id"})
    }
  }
  transaction.init({
    email: DataTypes.STRING,
    harga: DataTypes.INTEGER,
    status: DataTypes.ENUM("MENUNGGU PEMBAYARAN","PENDING","PEMBAYARAN SELESAI","CANCEL"),
    nama_lengkap: DataTypes.STRING,
    no_wa: DataTypes.STRING,
    transaksi_uid: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'transaction',
  });
  return transaction;
};