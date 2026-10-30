'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("students_enrollments", {
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      student_id: {
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
      enrollment_date: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      graduation_date: {
        type: Sequelize.DATEONLY,
        allowNull: true,
      },
      status: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('students_enrollments');

  }
};
