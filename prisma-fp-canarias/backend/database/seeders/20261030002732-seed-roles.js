'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const now = new Date();
    await queryInterface.bulkInsert('roles', [{
      id: 1,
      name: 'Administrator IT',
      description: 'Administrator IT role with full access to the system',
      created_at: now,
      updated_at: now
    },
    {
      id: 2,
      name: 'User',
      description: 'User without role asigned with limited access to the system',
      created_at: now,
      updated_at: now
    },
    {
      id: 3,
      name: 'Tutor',
      description: 'Tutor role with limited access to the system',
      created_at: now,
      updated_at: now
    },
    {
      id: 4,
      name : 'Administrator College',
      description: 'Administrator College role with limitedaccess to the system',
      created_at: now,
      updated_at: now
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
