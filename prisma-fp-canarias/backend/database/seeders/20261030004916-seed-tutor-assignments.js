'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('tutor_assignments', [
      {
        id: 1,
        tutorId: 1,
        programId: 1,
        academicYearId: 1,
        assignedAt: new Date('2025-09-01')
      }
    ], {});

    if (queryInterface.sequelize.getDialect() === 'postgres') {
      await queryInterface.sequelize.query(`
        SELECT setval(
          pg_get_serial_sequence('public.tutor_assignments', 'id'),
          COALESCE((SELECT MAX(id) FROM public.tutor_assignments), 0) + 1,
          false
        );
      `);
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(
      'tutor_assignments',
      { id: 1 },
      {}
    );
  }
};
