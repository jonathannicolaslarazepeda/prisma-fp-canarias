'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('educational_centers', [
      {
        id: 1,
        name: 'IES El Rincón',
        code: '35009577',
        logo_url: 'logo.png',
        address: 'Av. del Industrial José Sánchez Peñate, s/n, Las Palmas de Gran Canaria',
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