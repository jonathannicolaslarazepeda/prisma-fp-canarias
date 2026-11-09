'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();
    await queryInterface.bulkInsert('survey_answers', [
      {
        id: 1,
        invitation_id: 1,
        question_id: 1,
        answer_value: 'Blue',
        answered_at: now,
        created_at: now,
        updated_at: now
      },
      {
        id: 2,
        invitation_id: 1,
        question_id: 2,
        answer_value: '25',
        answered_at: now,
        created_at: now,
        updated_at: now
      }
    ], {});

    if (queryInterface.sequelize.getDialect() === 'postgres') {
      await queryInterface.sequelize.query(`
        SELECT setval(
          pg_get_serial_sequence('public.survey_answers', 'id'),
          COALESCE((SELECT MAX(id) FROM public.survey_answers), 0) + 1,
          false
        );
      `);
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('survey_answers', { id: [1, 2] });
  }
};
