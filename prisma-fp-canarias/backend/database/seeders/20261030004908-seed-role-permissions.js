'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const now = new Date();
    await queryInterface.bulkInsert('role_permissions', [{
      role_id: 1,
      permission_id: 1
    },
    {
      role_id: 1,
      permission_id: 2
    },
    {
      role_id: 1,
      permission_id: 3
    },
    {
      role_id: 1,
      permission_id: 4
    },
    {
      role_id: 1,
      permission_id: 5
    },
    {
      role_id: 1,
      permission_id: 6
    },
    {
      role_id: 1,
      permission_id: 7
    },
    {
      role_id: 1,
      permission_id: 8
    },
    {
      role_id: 1,
      permission_id: 9
    },
    {
      role_id: 1,
      permission_id: 10
    },
    {
      role_id: 1,
      permission_id: 11
    },
    {
      role_id: 1,
      permission_id: 12
    },
    {
      role_id: 1,
      permission_id: 13
    },
    {
      role_id: 1,
      permission_id: 14
    },
    {
      role_id: 1,
      permission_id: 15
    },
    {
      role_id: 1,
      permission_id: 16
    },
    {
      role_id: 1,
      permission_id: 17
    },
    {
      role_id: 1,
      permission_id: 18
    },
    {
      role_id: 1,
      permission_id: 19
    },
    {
      role_id: 1,
      permission_id: 20
    },
    {
      role_id: 2,
      permission_id: 1
    },
    {
      role_id: 2,
      permission_id: 5
    },
    {
      role_id: 2,
      permission_id: 9
    },
    {
      role_id: 2,
      permission_id: 13
    },

    // Administrator IT - Educational Center permissions
    {
      role_id: 1,
      permission_id: 21
    },
    {
      role_id: 1,
      permission_id: 22
    },
    {
      role_id: 1,
      permission_id: 23
    },
    {
      role_id: 1,
      permission_id: 24
    },

    // Administrator IT - Academic Year permissions
    {
      role_id: 1,
      permission_id: 25
    },
    {
      role_id: 1,
      permission_id: 26
    },
    {
      role_id: 1,
      permission_id: 27
    },
    {
      role_id: 1,
      permission_id: 28
    },

    // Administrator IT - Professional Family permissions
    {
      role_id: 1,
      permission_id: 29
    },
    {
      role_id: 1,
      permission_id: 30
    },
    {
      role_id: 1,
      permission_id: 31
    },
    {
      role_id: 1,
      permission_id: 32
    },

    // Administrator IT - Training Program permissions
    {
      role_id: 1,
      permission_id: 33
    },
    {
      role_id: 1,
      permission_id: 34
    },
    {
      role_id: 1,
      permission_id: 35
    },
    {
      role_id: 1,
      permission_id: 36
    },

    // Administrator IT - Tutor Assignment permissions
    {
      role_id: 1,
      permission_id: 37
    },
    {
      role_id: 1,
      permission_id: 38
    },
    {
      role_id: 1,
      permission_id: 39
    },
    {
      role_id: 1,
      permission_id: 40
    },

    // Administrator IT - Student Enrollment permissions
    {
      role_id: 1,
      permission_id: 41
    },
    {
      role_id: 1,
      permission_id: 42
    },
    {
      role_id: 1,
      permission_id: 43
    },
    {
      role_id: 1,
      permission_id: 44
    },

    // User - Academic Administration permissions
    {
      role_id: 2,
      permission_id: 21
    },
    {
      role_id: 2,
      permission_id: 25
    },
    {
      role_id: 2,
      permission_id: 29
    },
    {
      role_id: 2,
      permission_id: 33
    },

    // Tutor - Academic Administration permissions
    {
      role_id: 3,
      permission_id: 21
    },
    {
      role_id: 3,
      permission_id: 25
    },
    {
      role_id: 3,
      permission_id: 29
    },
    {
      role_id: 3,
      permission_id: 33
    },
    {
      role_id: 3,
      permission_id: 37
    },
    {
      role_id: 3,
      permission_id: 41
    },

    // Administrator College - Educational Center permissions
    {
      role_id: 4,
      permission_id: 21
    },
    {
      role_id: 4,
      permission_id: 23
    },

    // Administrator College - Academic Year permissions
    {
      role_id: 4,
      permission_id: 25
    },

    // Administrator College - Professional Family permissions
    {
      role_id: 4,
      permission_id: 29
    },

    // Administrator College - Training Program permissions
    {
      role_id: 4,
      permission_id: 33
    },

    // Administrator College - Tutor Assignment permissions
    {
      role_id: 4,
      permission_id: 37
    },
    {
      role_id: 4,
      permission_id: 38
    },
    {
      role_id: 4,
      permission_id: 39
    },
    {
      role_id: 4,
      permission_id: 40
    },

    // Administrator College - Student Enrollment permissions
    {
      role_id: 4,
      permission_id: 41
    },
    {
      role_id: 4,
      permission_id: 42
    },
    {
      role_id: 4,
      permission_id: 43
    }
  ], {});

    //Synchronous PostgreSQL autoincrement

    if (queryInterface.sequelize.getDialect() === 'postgres') {
      await queryInterface.sequelize.query(`
    SELECT setval(
      pg_get_serial_sequence('role_permissions', 'id'),
      COALESCE((SELECT MAX(id) FROM role_permissions), 0) + 1,
      FALSE);
      `);
    }
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('role_permissions', { id: [1] });

    // Administrator IT - Academic Administration permissions
    await queryInterface.bulkDelete('role_permissions', {
      role_id: 1,
      permission_id: [
        21, 22, 23, 24,
        25, 26, 27, 28,
        29, 30, 31, 32,
        33, 34, 35, 36,
        37, 38, 39, 40,
        41, 42, 43, 44
      ]
    });

    // User - Academic Administration permissions
    await queryInterface.bulkDelete('role_permissions', {
      role_id: 2,
      permission_id: [21, 25, 29, 33]
    });

    // Tutor - Academic Administration permissions
    await queryInterface.bulkDelete('role_permissions', {
      role_id: 3,
      permission_id: [21, 25, 29, 33, 37, 41]
    });

    // Administrator College - Academic Administration permissions
    await queryInterface.bulkDelete('role_permissions', {
      role_id: 4,
      permission_id: [
        21, 23, 25, 29, 33,
        37, 38, 39, 40,
        41, 42, 43
      ]
    });
  }
};