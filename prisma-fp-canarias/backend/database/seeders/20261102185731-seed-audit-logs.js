'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();
    await queryInterface.bulkInsert('audit_logs', [{
      id: 1,
      user_id: 1,
      action: 'CREATE',
      entity_type: 'users',
      entity_id: 1,
      previous_values: null,
      new_values: null,
      created_at: now
    }, {
      id: 2,
      user_id: 2,
      action: 'UPDATE',
      entity_type: 'users',
      entity_id: 2,
      previous_values: null,
      new_values: null,
      created_at: now
    }
    ], {});

    //Synchronous PostgreSQL autoincrement

    if (queryInterface.sequelize.getDialect() === 'postgres') {
      await queryInterface.sequelize.query(`
    SELECT setval(
      pg_get_serial_sequence('audit_logs', 'id'),
      COALESCE((SELECT MAX(id) FROM audit_logs), 0) + 1,
      FALSE);
      `);
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('audit_logs', { id: [1, 2] });
  }
};
