'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();
    await queryInterface.bulkInsert('audit_logs', [{
      id: 1,
      userId: 1,
      action: 'CREATE',
      tableName: 'users',
      recordId: 1,
      oldValues: null,
      newValues: null,
      createdAt: now,
      updatedAt: now
    }, {
      id: 2,
      userId: 2,
      action: 'UPDATE',
      tableName: 'users',
      recordId: 2,
      oldValues: null,
      newValues: null,
      createdAt: now,
      updatedAt: now
    }
    ], {});

    //Synchronous PostgreSQL autoincrement

    if (queryInterface.sequelize.getDialect() === 'postgres') {
      await queryInterface.sequelize.query(`
    SELECT setval(
      pg_get_serial_sequence('auth_tokens', 'id'),
      COALESCE((SELECT MAX(id) FROM auth_tokens), 0) + 1,
      FALSE);
      `);
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('audit_logs', { id: [1, 2] });
  }
};
