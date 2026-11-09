'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();
    await queryInterface.bulkInsert('internships', [
      {
        id: 1,
        enrollment_id: 1,
        company_id: 1,
        start_date: '2026-03-01',
        end_date: '2026-06-01',
        was_hired: true,
        hiring_date: '2026-06-15',
        created_at: now,
        updated_at: now
      },
      {
        id: 2,
        enrollment_id: 2,
        company_id: 2,
        start_date: '2026-03-01',
        end_date: '2026-06-01',
        was_hired: false,
        hiring_date: null,
        created_at: now,
        updated_at: now
      }
    ], {});

    if (queryInterface.sequelize.getDialect() === 'postgres') {
      await queryInterface.sequelize.query(`
        SELECT setval(
          pg_get_serial_sequence('public.internships', 'id'),
          COALESCE((SELECT MAX(id) FROM public.internships), 0) + 1,
          false
        );
      `);
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('internships', { id: [1, 2] });
  }
};
