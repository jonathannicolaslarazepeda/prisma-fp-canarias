'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const now = new Date();
    await queryInterface.bulkInsert('auth_tokens', [{
      id: 1,
      user_id: 1,
      token_hash: 'sample_token_1',
      token_type: 'access',
      expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000),
      created_at: now,
      updated_at: now
    },{
      id: 2,
      user_id: 2,
      token_hash: 'sample_token_2',
      token_type: 'access',
      expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000),
      created_at: now,
      updated_at: now
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

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('auth_tokens', { id: [1, 2] });
  }
};
