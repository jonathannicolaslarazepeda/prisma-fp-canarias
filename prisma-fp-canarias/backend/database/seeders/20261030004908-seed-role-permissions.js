'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const now = new Date();
    await queryInterface.bulkInsert('role_permissions', [{
      role_id: 1,
      permission_id: 1
    },
    {
      role_id: 1,
      permission_id: 2
    },
    {
      role_id: 1,
      permission_id: 3
    },
    {
      role_id: 1,
      permission_id: 4
    },
    {
      role_id: 1,
      permission_id: 5
    },
    {
      role_id: 1,
      permission_id: 6
    },
    {
      role_id: 1,
      permission_id: 7
    },
    {
      role_id: 1,
      permission_id: 8
    },
    {
      role_id: 1,
      permission_id: 9
    },
    {
      role_id: 1,
      permission_id: 10
    },
    {
      role_id: 1,
      permission_id: 11
    },
    {
      role_id: 1,
      permission_id: 12
    },
    {
      role_id: 1,
      permission_id: 13
    },
    {
      role_id: 1,
      permission_id: 14
    },
    {
      role_id: 1,
      permission_id: 15
    },
    {
      role_id: 1,
      permission_id: 16
    },
    {
      role_id: 1,
      permission_id: 17
    },
    {
      role_id: 1,
      permission_id: 18
    },
    {
      role_id: 1,
      permission_id: 19
    },
    {
      role_id: 1,
      permission_id: 20
    },
    {
      role_id: 2,
      permission_id: 1
    },
    {
      role_id: 2,
      permission_id: 5
    },
    {
      role_id: 2,
      permission_id: 9
    },
    {
      role_id: 2,
      permission_id: 13
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
