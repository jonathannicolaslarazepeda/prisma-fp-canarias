'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('training_programs', [
      {
        id: 1,
        family_id: 1,
        center_id: 1,
        name: 'Farmacia y Parafarmacia',
        code: 'FARMACIA',
        level: 'Grado Medio',
        is_active: true
      }
    ], {});

    if (queryInterface.sequelize.getDialect() === 'postgres') {
      await queryInterface.sequelize.query(`
        SELECT setval(
          pg_get_serial_sequence('public.training_programs', 'id'),
          COALESCE((SELECT MAX(id) FROM public.training_programs), 0) + 1,
          false
        );
      `);
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(
      'training_programs',
      { id: 1 },
      {}
    );
  }
};
