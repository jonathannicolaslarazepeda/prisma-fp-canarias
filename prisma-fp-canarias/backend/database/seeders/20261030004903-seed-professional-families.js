'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('professional_families', [
      {
        id: 1,
        name: 'Sanidad',
        code: 'SANIDAD',
        description: 'Familia profesional relacionada con la salud y la atención sanitaria'
      }
    ], {});

    if (queryInterface.sequelize.getDialect() === 'postgres') {
      await queryInterface.sequelize.query(`
        SELECT setval(
          pg_get_serial_sequence('public.professional_families', 'id'),
          COALESCE((SELECT MAX(id) FROM public.professional_families), 0) + 1,
          false
        );
      `);
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(
      'professional_families',
      { id: 1 },
      {}
    );
  }
};