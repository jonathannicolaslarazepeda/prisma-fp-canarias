"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("consent-requests", {
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      studentId: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        references: { model: "students", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      
      sentById: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
      },
      tokenHash: {
        type: Sequelize.STRING(255),
        allowNull: false,
        unique: true,
      },
      sentAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      expiresAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      usedAt: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("consent-requests");
  },
};
