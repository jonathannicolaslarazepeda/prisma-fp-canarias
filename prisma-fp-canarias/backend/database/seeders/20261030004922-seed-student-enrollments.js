
'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('student_enrollments', [
      {
        id: 1,
        studentId: 1,
        programId: 1,
        academicYearId: 1,
        enrollmentDate: '2025-09-01',
        graduationDate: null,
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
    await queryInterface.bulkDelete(
      'student_enrollments',
      { id: 1 },
      {}
    );
  }
};
