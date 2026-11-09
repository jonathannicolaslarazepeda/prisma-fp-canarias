'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('companies', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      tax_id: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      sector: {
        type: Sequelize.STRING,
        allowNull: false
      },
      city: {
        type: Sequelize.STRING,
        allowNull: false
      },
      contact_email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      contact_phone: {
        type: Sequelize.STRING,
        allowNull: false
      },
      created_at: { type: Sequelize.DATE },
      updated_at: { type: Sequelize.DATE }
    });

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('companies');
  }
};
