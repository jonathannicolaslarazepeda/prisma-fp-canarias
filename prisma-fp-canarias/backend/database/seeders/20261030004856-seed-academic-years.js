'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('academic_years', [
      {
        id: 1,
        name: '2025-2026',
        startDate: new Date('2025-09-01'),
        endDate: new Date('2026-06-30'),
        isActive: true
      }
    ], {});

    if (queryInterface.sequelize.getDialect() === 'postgres') {
      await queryInterface.sequelize.query(`
        SELECT setval(
          pg_get_serial_sequence('public.academic_years', 'id'),
          COALESCE((SELECT MAX(id) FROM public.academic_years), 0) + 1,
          false
        );
      `);
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(
      'academic_years',
      { id: 1 },
      {}
    );
  }
};