'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const now = new Date();
    await queryInterface.bulkInsert('role_users', [{
      id: 1,
      userId: 1,
      roleId: 1
    },
    {
      id: 2,
      userId: 2,
      roleId: 2
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
    await queryInterface.bulkDelete('role_users', { id: [1, 2] });
  }
};
