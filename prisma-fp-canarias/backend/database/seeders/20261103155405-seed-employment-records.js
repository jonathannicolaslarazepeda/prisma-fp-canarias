'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();
    await queryInterface.bulkInsert('employment_records', [
      {
        id: 1,
        student_id: 1,
        company_id: 1,
        internship_id: 1,
        position: 'Junior Developer',
        sector: 'Technology',
        start_date: '2026-06-15',
        end_date: null,
        is_related_to_studies: true,
        created_at: now,
        updated_at: now
      },
      {
        id: 2,
        student_id: 2,
        company_id: 2,
        internship_id: null,
        position: 'Administrative Assistant',
        sector: 'Healthcare',
        start_date: '2026-09-01',
        end_date: null,
        is_related_to_studies: false,
        created_at: now,
        updated_at: now
      }
    ], {});

    if (queryInterface.sequelize.getDialect() === 'postgres') {
      await queryInterface.sequelize.query(`
        SELECT setval(
          pg_get_serial_sequence('public.employment_records', 'id'),
          COALESCE((SELECT MAX(id) FROM public.employment_records), 0) + 1,
          false
        );
      `);
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('employment_records', { id: [1, 2] });
  }
};
