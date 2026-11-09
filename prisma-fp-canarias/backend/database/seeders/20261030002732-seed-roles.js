'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const now = new Date();
    await queryInterface.bulkInsert('roles', [{
      id: 1,
      name: 'Admin',
      description: 'Administrator role with full access',
      createdAt: now,
      updatedAt: now
    },
    {
      id: 2,
      name: 'User',
      description: 'Regular user role with limited access',
      createdAt: now,
      updatedAt: now
    }], {});

    //Synchronous PostgreSQL autoincrement

    if (queryInterface.sequelize.getDialect() === 'postgres') {
      await queryInterface.sequelize.query(`
    SELECT setval(
      pg_get_serial_sequence('roles', 'id'),
      COALESCE((SELECT MAX(id) FROM roles), 0) + 1,
      FALSE);
      `);
    }
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('roles', { id: [1, 2] });
  }
};
