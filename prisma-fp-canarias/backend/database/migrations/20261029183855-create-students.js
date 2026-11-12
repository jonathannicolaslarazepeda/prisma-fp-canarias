"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("students", {
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      
      user_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
      },
      national_id: {
        type: Sequelize.STRING(30),
        allowNull: false,
        unique: true,
      },
      first_name: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      last_name: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING(150),
        allowNull: false,
      },
      phone: {
        type: Sequelize.STRING(30),
        allowNull: true,
      },
      birth_date: {
        type: Sequelize.DATEONLY,
        allowNull: true,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      created_at: { type: Sequelize.DATE },
      updated_at: { type: Sequelize.DATE }
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("students");
  },
};
