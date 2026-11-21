"use strict";

const now = new Date();

// [studentId, skillId, proficiencyLevel]
const rows = [
  [1, 1, "advanced"], [1, 2, "intermediate"], [1, 6, "advanced"], [1, 7, "advanced"],
  [2, 3, "advanced"], [2, 4, "intermediate"], [2, 8, "advanced"],
  [3, 5, "intermediate"], [3, 1, "intermediate"], [3, 12, "beginner"],
  [4, 10, "advanced"], [4, 11, "advanced"], [4, 9, "intermediate"],
  [5, 1, "beginner"], [5, 6, "beginner"], [5, 7, "intermediate"],
  [6, 11, "intermediate"], [6, 10, "intermediate"],
  [7, 5, "advanced"], [7, 2, "advanced"], [7, 12, "intermediate"],
  [8, 3, "beginner"], [8, 9, "advanced"],
].map(([student_id, skill_id, proficiency_level]) => ({
  student_id,
  skill_id,
  proficiency_level: proficiency_level,
  updated_at: now,
}));

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert("student_skills", rows);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("student_skills", {
      student_id: { [Sequelize.Op.in]: [...new Set(rows.map((r) => r.student_id))] },
    });
  },
};
