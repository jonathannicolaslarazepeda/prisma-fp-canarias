'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();
    await queryInterface.bulkInsert('companies', [
      {
        id: 1,
        tax_id: '123456789',
        name: 'Company 1',
        sector: 'Technology',
        city: 'City A',
        contact_email: 'company1@example.com',
        contact_phone: '123-456-7890',
        created_at: now,
        updated_at: now
      },
      {
        id: 2,
        tax_id: '987654321',
        name: 'Company 2',
        sector: 'Healthcare',
        city: 'City B',
        contact_email: 'company2@example.com',
        contact_phone: '098-765-4321',
        created_at: now,
        updated_at: now
      }
    ], {});

    if (queryInterface.sequelize.getDialect() === 'postgres') {
      await queryInterface.sequelize.query(`
        SELECT setval(
          pg_get_serial_sequence('public.companies', 'id'),
          COALESCE((SELECT MAX(id) FROM public.companies), 0) + 1,
          false
        );
      `);
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('companies', { id: [1, 2] });
  }
};
