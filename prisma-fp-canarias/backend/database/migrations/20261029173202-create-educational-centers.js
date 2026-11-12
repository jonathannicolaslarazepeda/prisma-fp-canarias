'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("educational_centers", {
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING(250),
        allowNull: false,
        unique: true,
      },
      code: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true,
      },
      logo_url: {
        type: Sequelize.STRING(255),
        allowNull: false,

      },
      address: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      is_active: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      created_at: { type: Sequelize.DATE },
      updated_at: { type: Sequelize.DATE }
    })

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.droptTable('educational_centers');
  }
};
