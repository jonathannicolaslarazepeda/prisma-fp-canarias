'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const now = new Date();
    await queryInterface.bulkInsert('permissions', [{
      id: 1,
      code: 'Create User',
      description: 'Permission to create new users'
    },
    {
      id: 2,
      code: 'Update User',
      description: 'Permission to update existing users'
    }], {});

    //Synchronous PostgreSQL autoincrement

    if (queryInterface.sequelize.getDialect() === 'postgres') {
      await queryInterface.sequelize.query(`
    SELECT setval(
      pg_get_serial_sequence('permissions', 'id'),
      COALESCE((SELECT MAX(id) FROM permissions), 0) + 1,
      FALSE);
      `);
    }
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('permissions', { id: [1, 2] });
  }
};
