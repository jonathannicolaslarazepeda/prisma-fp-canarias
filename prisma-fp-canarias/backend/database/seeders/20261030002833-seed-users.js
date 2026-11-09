'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();
    await queryInterface.bulkInsert('users', [{
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      createdAt: now,
      updatedAt: now
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      createdAt: now,
      updatedAt: now
    }], {});

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
