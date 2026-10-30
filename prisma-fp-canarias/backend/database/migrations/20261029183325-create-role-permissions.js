'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('role_permissions', {

      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },

      role_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
      },

      permission_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
      },
  })},

      async down(queryInterface, Sequelize) {
      await queryInterface.dropTable('role_permissions');
    }
};
