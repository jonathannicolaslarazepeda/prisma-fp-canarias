'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('educational_centers', [
      {
        id: 1,
        name: 'IES Primero de Mayo',
        code: '35009383',
        logo_url: 'logo.png',
        address: 'Av. Parque Central, s/n, 35013 Las Palmas de Gran Canaria',
        is_active: true
      }
    ], {});

    if (queryInterface.sequelize.getDialect() === 'postgres') {
      await queryInterface.sequelize.query(`
        SELECT setval(
          pg_get_serial_sequence('public.educational_centers', 'id'),
          COALESCE((SELECT MAX(id) FROM public.educational_centers), 0) + 1,
          false
        );
      `);
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(
      'educational_centers',
      { id: 1 },
      {}
    );
  }
};