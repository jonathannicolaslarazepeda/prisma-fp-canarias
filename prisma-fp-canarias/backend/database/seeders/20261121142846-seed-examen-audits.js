
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('examen_audits', [
      {
        id: 1,
        educational_center_id: 1,
        description: 'Creación de auditoría de examen',
        operation: 'CREATE',
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {});

    if (queryInterface.sequelize.getDialect() === 'postgres') {
      await queryInterface.sequelize.query(`
        SELECT setval(
          pg_get_serial_sequence('public.examen_audits', 'id'),
          COALESCE((SELECT MAX(id) FROM public.examen_audits), 0) + 1,
          false
        );
      `);
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(
      'examen_audits',
      { id: 1 },
      {}
    );
  }
};
