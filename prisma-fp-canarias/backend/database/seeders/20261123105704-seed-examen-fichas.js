
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('examen_fichas', [
      {
        id: 1,
        educational_center_id: 1,
        description: 'Ficha del IES Primero de Mayo',
        operation: 'CREATE',
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {});

    if (queryInterface.sequelize.getDialect() === 'postgres') {
      await queryInterface.sequelize.query(`
        SELECT setval(
          pg_get_serial_sequence('public.examen_fichas', 'id'),
          COALESCE((SELECT MAX(id) FROM public.examen_fichas), 0) + 1,
          false
        );
      `);
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(
      'examen_fichas',
      { id: 1 },
      {}
    );
  }
};
