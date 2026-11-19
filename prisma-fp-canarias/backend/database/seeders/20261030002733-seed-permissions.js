'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();
    await queryInterface.bulkInsert('permissions', [{
      id: 1,
      code: 'user:read',
      description: 'Permission to read user information'
    },
    {
      id: 2,
      code: 'user:create',
      description: 'Permission to create new users'
    },
    {
      id: 3,
      code: 'user:update',
      description: 'Permission to update existing users'
    },
    {
      id: 4,
      code: 'user:delete',
      description: 'Permission to delete users'
    },
    {
      id: 5,
      code: 'role:read',
      description: 'Permission to read role information'
    },
    {
      id: 6,
      code: 'role:create',
      description: 'Permission to create new roles'
    },
    {
      id: 7,
      code: 'role:update',
      description: 'Permission to update existing roles'
    },
    {
      id: 8,
      code: 'role:delete',
      description: 'Permission to delete roles'
    },
    {
      id: 9,
      code: 'permission:read',
      description: 'Permission to read permission information'
    },
    {
      id: 10,
      code: 'permission:create',
      description: 'Permission to create new permissions'
    },
    {
      id: 11,
      code: 'permission:update',
      description: 'Permission to update existing permissions'
    },
    {
      id: 12,
      code: 'permission:delete',
      description: 'Permission to delete permissions'
    },
    {
      id: 13,
      code: 'role-user:read',
      description: 'Permission to assign roles to users' 
    },
    {
      id: 14,
      code: 'role-user:create',
      description: 'Permission to assign users to roles'
    },
    {
      id: 15,
      code: 'role-user:update',
      description: 'Permission to update role assignments for users'
    },
    {
      id: 16,
      code: 'role-user:delete',
      description: 'Permission to delete role assignments for users'
    },
    {
      id: 17,
      code: 'role-permission:read',
      description: 'Permission to view permission assignments for roles'
    },
    {
      id: 18,
      code: 'role-permission:create',
      description: 'Permission to assign permissions to roles'
    },
    {
      id: 19,
      code: 'role-permission:update',
      description: 'Permission to update permission assignments for roles'
    },
    {
      id: 20,
      code: 'role-permission:delete',
      description: 'Permission to delete permission assignments for roles'
    }
  ], {});

    //Synchronous PostgreSQL autoincrement

    if (queryInterface.sequelize.getDialect() === 'postgres') {
      await queryInterface.sequelize.query(`
    SELECT setval(
      pg_get_serial_sequence('permissions', 'id'),
      COALESCE((SELECT MAX(id) FROM permissions), 0) + 1,
      FALSE);
      `);
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('permissions', { id: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16] });
  }
};
