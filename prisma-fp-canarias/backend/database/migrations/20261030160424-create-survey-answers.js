'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('survey_answers', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      invitation_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'survey_invitations', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },
      question_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'survey_questions', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },
      answer_value: {
        type: Sequelize.STRING,
        allowNull: true
      },
      answered_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
      created_at: { type: Sequelize.DATE },
      updated_at: { type: Sequelize.DATE }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('survey_answers');
  }
};
