'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const now = new Date();
    await queryInterface.bulkInsert('role_permissions', [{
      role_id: 1,
      permission_id: 1
    },{
      role_id: 1,
      permission_id: 2
    }
  ], {});

    //Synchronous PostgreSQL autoincrement

    if (queryInterface.sequelize.getDialect() === 'postgres') {
      await queryInterface.sequelize.query(`
    SELECT setval(
      pg_get_serial_sequence('role_permissions', 'id'),
      COALESCE((SELECT MAX(id) FROM role_permissions), 0) + 1,
      FALSE);
      `);
    }
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('role_permissions', { id: [1] });
  }
};
