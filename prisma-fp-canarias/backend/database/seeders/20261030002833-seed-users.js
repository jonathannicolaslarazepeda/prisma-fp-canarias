'use strict';

const bcrypt = require("bcryptjs");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();
    await queryInterface.bulkInsert('users', [{
     id: 1,
        first_name: 'John',
        last_name: 'Doe',
        email: 'ejemplo@example.com',
        password_hash: await bcrypt.hash('password123', 12),
        is_active: true,
        failed_login_attempts: 0,
        locked_until: null,
        created_at: now,
        updated_at: now
      },
      {
        id: 2,
        first_name: 'Jonathan',
        last_name: 'Lara',
        email: 'jonathanlara@example.com',
        password_hash: await bcrypt.hash('password123', 12),
        is_active: true,
        failed_login_attempts: 0,
        locked_until: null,
        created_at: now,
        updated_at: now
      }
    ]);

    //Synchronous PostgreSQL autoincrement

    if (queryInterface.sequelize.getDialect() === 'postgres') {
      await queryInterface.sequelize.query(`
    SELECT setval(
      pg_get_serial_sequence('users', 'id'),
      COALESCE((SELECT MAX(id) FROM users), 0) + 1,
      FALSE);
      `);
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', { id: [1, 2] });
  }
};
