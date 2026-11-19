'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('student_enrollments', [
      {
        id: 1,
        student_id: 1,
        program_id: 1,
        academic_year_id: 1,
        enrollment_date: '2025-09-01',
        graduation_date: null,
        status: 'Matriculado'
      },
      {
        id: 2,
        student_id: 2,
        program_id: 2,
        academic_year_id: 1,
        enrollment_date: '2025-09-01',
        graduation_date: null,
        status: 'Matriculado'
      }
    ], {});

    if (queryInterface.sequelize.getDialect() === 'postgres') {
      await queryInterface.sequelize.query(`
        SELECT setval(
          pg_get_serial_sequence('public.student_enrollments', 'id'),
          COALESCE((SELECT MAX(id) FROM public.student_enrollments), 0) + 1,
          false
        );
      `);
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('student_enrollments',{ id: [1, 2] });
  }
};
