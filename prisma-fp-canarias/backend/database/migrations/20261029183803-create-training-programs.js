'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("training_programs", {
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      family_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
      },
      center_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING(150),
        allowNull: false,
      },
      code: {
        type: Sequelize.STRING(40),
        allowNull: false,
      },
      level: {
        type: Sequelize.STRING(80),
        allowNull: false,
      },
      is_active: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },

    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('training_programs');
  }
};
