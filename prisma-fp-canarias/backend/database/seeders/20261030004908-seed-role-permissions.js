
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('role_permissions', [
      { id: 1, role_id: 1, permission_id: 1 },
      { id: 2, role_id: 1, permission_id: 2 },
      { id: 3, role_id: 1, permission_id: 3 },
      { id: 4, role_id: 1, permission_id: 4 },
      { id: 5, role_id: 1, permission_id: 5 },
      { id: 6, role_id: 1, permission_id: 6 },
      { id: 7, role_id: 1, permission_id: 7 },
      { id: 8, role_id: 1, permission_id: 8 },
      { id: 9, role_id: 1, permission_id: 9 },
      { id: 10, role_id: 1, permission_id: 10 },
      { id: 11, role_id: 1, permission_id: 11 },
      { id: 12, role_id: 1, permission_id: 12 },
      { id: 13, role_id: 1, permission_id: 13 },
      { id: 14, role_id: 1, permission_id: 14 },
      { id: 15, role_id: 1, permission_id: 15 },
      { id: 16, role_id: 1, permission_id: 16 },
      { id: 17, role_id: 1, permission_id: 17 },
      { id: 18, role_id: 1, permission_id: 18 },
      { id: 19, role_id: 1, permission_id: 19 },
      { id: 20, role_id: 1, permission_id: 20 },
      { id: 21, role_id: 2, permission_id: 1 },
      { id: 22, role_id: 2, permission_id: 5 },
      { id: 23, role_id: 2, permission_id: 9 },
      { id: 24, role_id: 2, permission_id: 13 },

      // Administrator IT - Educational Center permissions
      { id: 25, role_id: 1, permission_id: 21 },
      { id: 26, role_id: 1, permission_id: 22 },
      { id: 27, role_id: 1, permission_id: 23 },
      { id: 28, role_id: 1, permission_id: 24 },

      // Administrator IT - Academic Year permissions
      { id: 29, role_id: 1, permission_id: 25 },
      { id: 30, role_id: 1, permission_id: 26 },
      { id: 31, role_id: 1, permission_id: 27 },
      { id: 32, role_id: 1, permission_id: 28 },

      // Administrator IT - Professional Family permissions
      { id: 33, role_id: 1, permission_id: 29 },
      { id: 34, role_id: 1, permission_id: 30 },
      { id: 35, role_id: 1, permission_id: 31 },
      { id: 36, role_id: 1, permission_id: 32 },

      // Administrator IT - Training Program permissions
      { id: 37, role_id: 1, permission_id: 33 },
      { id: 38, role_id: 1, permission_id: 34 },
      { id: 39, role_id: 1, permission_id: 35 },
      { id: 40, role_id: 1, permission_id: 36 },

      // Administrator IT - Tutor Assignment permissions
      { id: 41, role_id: 1, permission_id: 37 },
      { id: 42, role_id: 1, permission_id: 38 },
      { id: 43, role_id: 1, permission_id: 39 },
      { id: 44, role_id: 1, permission_id: 40 },

      // Administrator IT - Student Enrollment permissions
      { id: 45, role_id: 1, permission_id: 41 },
      { id: 46, role_id: 1, permission_id: 42 },
      { id: 47, role_id: 1, permission_id: 43 },
      { id: 48, role_id: 1, permission_id: 44 },

      // User - Academic Administration permissions
      { id: 49, role_id: 2, permission_id: 21 },
      { id: 50, role_id: 2, permission_id: 25 },
      { id: 51, role_id: 2, permission_id: 29 },
      { id: 52, role_id: 2, permission_id: 33 },

      // Tutor - Academic Administration permissions
      { id: 53, role_id: 3, permission_id: 21 },
      { id: 54, role_id: 3, permission_id: 25 },
      { id: 55, role_id: 3, permission_id: 29 },
      { id: 56, role_id: 3, permission_id: 33 },
      { id: 57, role_id: 3, permission_id: 37 },
      { id: 58, role_id: 3, permission_id: 41 },

      // Administrator College - Educational Center permissions
      { id: 59, role_id: 4, permission_id: 21 },
      { id: 60, role_id: 4, permission_id: 23 },

      // Administrator College - Academic Year permissions
      { id: 61, role_id: 4, permission_id: 25 },

      // Administrator College - Professional Family permissions
      { id: 62, role_id: 4, permission_id: 29 },

      // Administrator College - Training Program permissions
      { id: 63, role_id: 4, permission_id: 33 },

      // Administrator College - Tutor Assignment permissions
      { id: 64, role_id: 4, permission_id: 37 },
      { id: 65, role_id: 4, permission_id: 38 },
      { id: 66, role_id: 4, permission_id: 39 },
      { id: 67, role_id: 4, permission_id: 40 },

      // Administrator College - Student Enrollment permissions
      { id: 68, role_id: 4, permission_id: 41 },
      { id: 69, role_id: 4, permission_id: 42 },
      { id: 70, role_id: 4, permission_id: 43 }
    ], {});

    // Synchronous PostgreSQL autoincrement
    if (queryInterface.sequelize.getDialect() === 'postgres') {
      await queryInterface.sequelize.query(`
        SELECT setval(
          pg_get_serial_sequence('role_permissions', 'id'),
          COALESCE((SELECT MAX(id) FROM role_permissions), 0) + 1,
          FALSE
        );
      `);
    }
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('role_permissions', {
      id: [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
        11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
        21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
        31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
        41, 42, 43, 44, 45, 46, 47, 48, 49, 50,
        51, 52, 53, 54, 55, 56, 57, 58, 59, 60,
        61, 62, 63, 64, 65, 66, 67, 68, 69, 70
      ]
    });
  }
};
