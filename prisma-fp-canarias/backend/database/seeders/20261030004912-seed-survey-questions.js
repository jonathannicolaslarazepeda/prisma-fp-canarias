'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();
    await queryInterface.bulkInsert('survey_questions', [
      {
        id: 1,
        survey_id: 1,
        question_text: 'What is your favorite color?',
        question_type: 'text',
        sort_order: 1,
        is_required: true,
        created_at: now,
        updated_at: now
      },
      {
        id: 2,
        survey_id: 1,
        question_text: 'What is your age?',
        question_type: 'number',
        sort_order: 2,
        is_required: false,
        created_at: now,
        updated_at: now
      }
    ], {});

    if (queryInterface.sequelize.getDialect() === 'postgres') {
      await queryInterface.sequelize.query(`
        SELECT setval(
          pg_get_serial_sequence('public.survey_questions', 'id'),
          COALESCE((SELECT MAX(id) FROM public.survey_questions), 0) + 1,
          false
        );
      `);
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('survey_questions', { id: [1, 2] });
  }
};
