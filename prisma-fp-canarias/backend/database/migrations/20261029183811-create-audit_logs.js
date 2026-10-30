'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('audit_logs', {
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },

      user_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
      },

      action: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },

      entity_type: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },

      entity_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
      },

      previous_values: {
        type: Sequelize.JSON,
        allowNull: true,
      },

      new_values: {
        type: Sequelize.JSON,
        allowNull: true,
      },

      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('audit_logs');
  }
};
