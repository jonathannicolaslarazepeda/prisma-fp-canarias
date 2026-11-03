'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();
    const inSevenDays = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
    await queryInterface.bulkInsert('survey_invitations', [
      {
        id: 1,
        survey_id: 1,
        student_id: 1,
        token_hash: 'token_hash_1',
        sent_at: now,
        expires_at: inSevenDays,
        completed_at: now,
        created_at: now,
        updated_at: now
      },
      {
        id: 2,
        survey_id: 1,
        student_id: 2,
        token_hash: 'token_hash_2',
        sent_at: now,
        expires_at: inSevenDays,
        completed_at: null,
        created_at: now,
        updated_at: now
      }
    ], {});

    if (queryInterface.sequelize.getDialect() === 'postgres') {
      await queryInterface.sequelize.query(`
        SELECT setval(
          pg_get_serial_sequence('public.survey_invitations', 'id'),
          COALESCE((SELECT MAX(id) FROM public.survey_invitations), 0) + 1,
          false
        );
      `);
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('survey_invitations', { id: [1, 2] });
  }
};
