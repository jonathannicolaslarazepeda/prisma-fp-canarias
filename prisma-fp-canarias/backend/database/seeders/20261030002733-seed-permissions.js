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
    },

    // Educational Center permissions
    {
      id: 21,
      code: 'educational-center:read',
      description: 'Permission to read educational center information'
    },
    {
      id: 22,
      code: 'educational-center:create',
      description: 'Permission to create new educational centers'
    },
    {
      id: 23,
      code: 'educational-center:update',
      description: 'Permission to update existing educational centers'
    },
    {
      id: 24,
      code: 'educational-center:delete',
      description: 'Permission to delete educational centers'
    },

    // Academic Year permissions
    {
      id: 25,
      code: 'academic-year:read',
      description: 'Permission to read academic year information'
    },
    {
      id: 26,
      code: 'academic-year:create',
      description: 'Permission to create new academic years'
    },
    {
      id: 27,
      code: 'academic-year:update',
      description: 'Permission to update existing academic years'
    },
    {
      id: 28,
      code: 'academic-year:delete',
      description: 'Permission to delete academic years'
    },

    // Professional Family permissions
    {
      id: 29,
      code: 'professional-family:read',
      description: 'Permission to read professional family information'
    },
    {
      id: 30,
      code: 'professional-family:create',
      description: 'Permission to create new professional families'
    },
    {
      id: 31,
      code: 'professional-family:update',
      description: 'Permission to update existing professional families'
    },
    {
      id: 32,
      code: 'professional-family:delete',
      description: 'Permission to delete professional families'
    },

    // Training Program permissions
    {
      id: 33,
      code: 'training-program:read',
      description: 'Permission to read training program information'
    },
    {
      id: 34,
      code: 'training-program:create',
      description: 'Permission to create new training programs'
    },
    {
      id: 35,
      code: 'training-program:update',
      description: 'Permission to update existing training programs'
    },
    {
      id: 36,
      code: 'training-program:delete',
      description: 'Permission to delete training programs'
    },

    // Tutor Assignment permissions
    {
      id: 37,
      code: 'tutor-assignment:read',
      description: 'Permission to read tutor assignment information'
    },
    {
      id: 38,
      code: 'tutor-assignment:create',
      description: 'Permission to create new tutor assignments'
    },
    {
      id: 39,
      code: 'tutor-assignment:update',
      description: 'Permission to update existing tutor assignments'
    },
    {
      id: 40,
      code: 'tutor-assignment:delete',
      description: 'Permission to delete tutor assignments'
    },

    // Student Enrollment permissions
    {
      id: 41,
      code: 'student-enrollment:read',
      description: 'Permission to read student enrollment information'
    },
    {
      id: 42,
      code: 'student-enrollment:create',
      description: 'Permission to create new student enrollments'
    },
    {
      id: 43,
      code: 'student-enrollment:update',
      description: 'Permission to update existing student enrollments'
    },
    {
      id: 44,
      code: 'student-enrollment:delete',
      description: 'Permission to delete student enrollments'
    },

    // Company permissions
    {
      id: 45,
      code: 'company:read',
      description: 'Permission to read company information'
    },
    {
      id: 46,
      code: 'company:create',
      description: 'Permission to create new companies'
    },
    {
      id: 47,
      code: 'company:update',
      description: 'Permission to update existing companies'
    },
    {
      id: 48,
      code: 'company:delete',
      description: 'Permission to delete companies'
    },

    // Internship permissions
    {
      id: 49,
      code: 'internship:read',
      description: 'Permission to read internship information'
    },
    {
      id: 50,
      code: 'internship:create',
      description: 'Permission to create new internships'
    },
    {
      id: 51,
      code: 'internship:update',
      description: 'Permission to update existing internships'
    },
    {
      id: 52,
      code: 'internship:delete',
      description: 'Permission to delete internships'
    },
    {
      id: 53,
      code: 'internship:stats',
      description: 'Permission to read the internship hiring rate'
    },

    // Employment Record permissions
    {
      id: 54,
      code: 'employment-record:read',
      description: 'Permission to read employment record information'
    },
    {
      id: 55,
      code: 'employment-record:create',
      description: 'Permission to create new employment records'
    },
    {
      id: 56,
      code: 'employment-record:update',
      description: 'Permission to update existing employment records'
    },
    {
      id: 57,
      code: 'employment-record:delete',
      description: 'Permission to delete employment records'
    },

    // Survey permissions
    {
      id: 58,
      code: 'survey:read',
      description: 'Permission to read surveys and their answer summary'
    },
    {
      id: 59,
      code: 'survey:create',
      description: 'Permission to create new surveys'
    },
    {
      id: 60,
      code: 'survey:update',
      description: 'Permission to update existing surveys'
    },
    {
      id: 61,
      code: 'survey:delete',
      description: 'Permission to delete surveys'
    },

    // Survey Question permissions
    {
      id: 62,
      code: 'survey-question:read',
      description: 'Permission to read survey question information'
    },
    {
      id: 63,
      code: 'survey-question:create',
      description: 'Permission to create new survey questions'
    },
    {
      id: 64,
      code: 'survey-question:update',
      description: 'Permission to update existing survey questions'
    },
    {
      id: 65,
      code: 'survey-question:delete',
      description: 'Permission to delete survey questions'
    },

    // Survey Invitation permissions
    {
      id: 66,
      code: 'survey-invitation:read',
      description: 'Permission to read survey invitation information'
    },
    {
      id: 67,
      code: 'survey-invitation:create',
      description: 'Permission to create survey invitations (send survey links)'
    },
    {
      id: 68,
      code: 'survey-invitation:update',
      description: 'Permission to update existing survey invitations'
    },
    {
      id: 69,
      code: 'survey-invitation:delete',
      description: 'Permission to delete survey invitations'
    },

    // Survey Answer permissions
    {
      id: 70,
      code: 'survey-answer:read',
      description: 'Permission to read survey answers'
    },
    {
      id: 71,
      code: 'survey-answer:create',
      description: 'Permission to create survey answers'
    },
    {
      id: 72,
      code: 'survey-answer:update',
      description: 'Permission to update existing survey answers'
    },
    {
      id: 73,
      code: 'survey-answer:delete',
      description: 'Permission to delete survey answers'
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
    await queryInterface.bulkDelete('permissions', { id: [
      1, 2, 3, 4,
      5, 6, 7, 8,
      9, 10, 11, 12,
      13, 14, 15, 16,
      17, 18, 19, 20,
      21, 22, 23, 24,
      25, 26, 27, 28,
      29, 30, 31, 32,
      33, 34, 35, 36,
      37, 38, 39, 40,
      41, 42, 43, 44,
      45, 46, 47, 48,
      49, 50, 51, 52, 53,
      54, 55, 56, 57,
      58, 59, 60, 61,
      62, 63, 64, 65,
      66, 67, 68, 69,
      70, 71, 72, 73
    ] });
  }
};