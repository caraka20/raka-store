'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('transactions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      email: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.INTEGER
      },
      status: {
        type: Sequelize.ENUM("MENUNGGU PEMBAYARAN","PENDING","PEMBAYARAN SELESAI", "CANCEL")
      },
      nama_lengkap: {
        type: Sequelize.STRING
      },
      no_hp: {
        type: Sequelize.STRING
      },
      transaksi_uid: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('transactions');
  }
};