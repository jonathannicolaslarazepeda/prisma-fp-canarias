'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();
    await queryInterface.bulkInsert('surveys', [
      {
        id: 1,
        title: 'Survey 1',
        description: 'Description for Survey 1',
        is_active: true,
        created_at: now,
        updated_at: now
      },
      {
        id: 2,
        title: 'Survey 2',
        description: 'Description for Survey 2',
        is_active: false,
        created_at: now,
        updated_at: now
      }
    ], {});

    if (queryInterface.sequelize.getDialect() === 'postgres') {
      await queryInterface.sequelize.query(`
        SELECT setval(
          pg_get_serial_sequence('public.surveys', 'id'),
          COALESCE((SELECT MAX(id) FROM public.surveys), 0) + 1,
          false
        );
      `);
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('surveys', { id: [1, 2] });
  }
};
