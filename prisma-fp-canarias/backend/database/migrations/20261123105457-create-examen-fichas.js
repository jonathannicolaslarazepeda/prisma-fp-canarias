
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("examen_fichas", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      educational_center_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
        references: {
          model: "educational_centers",
          key: "id",
        },
      },
      description: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      operation: {
        type: Sequelize.ENUM("CREATE", "MODIFY", "READ"),
        allowNull: true,
      },
      created_at: { type: Sequelize.DATE },
      updated_at: { type: Sequelize.DATE }
    });

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('examen_fichas');
  }
};
