'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("tutor_assignments", {
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      tutor_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
      },
      program_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
      },
      academic_year_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
      },
      assigned_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('tutor_assignments');
  }
};
