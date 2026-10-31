'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('training_programs', [
      {
        id: 1,
        familyId: 1,
        centerId: 1,
        name: 'Farmacia y Parafarmacia',
        code: 'FARMACIA',
        level: 'Grado Medio',
        isActive: true
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
