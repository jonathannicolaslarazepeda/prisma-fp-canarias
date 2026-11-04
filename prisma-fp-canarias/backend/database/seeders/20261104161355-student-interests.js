"use strict";

const interests = [
  { id: 1, studentId: 1, name: "Web development", description: "Interested in full stack applications." },
  { id: 2, studentId: 1, name: "Video games", description: null },
  { id: 3, studentId: 2, name: "Data science", description: "Data analysis and visualization." },
  { id: 4, studentId: 2, name: "Hiking", description: "Trails around the islands." },
  { id: 5, studentId: 3, name: "Interface design", description: null },
  { id: 6, studentId: 4, name: "Cybersecurity", description: "Pentesting and system defense." },
  { id: 7, studentId: 4, name: "Photography", description: null },
  { id: 8, studentId: 5, name: "Artificial intelligence", description: "Applied machine learning." },
  { id: 9, studentId: 6, name: "System administration", description: "Infrastructure and automation." },
  { id: 10, studentId: 6, name: "Surf", description: null },
  { id: 11, studentId: 7, name: "Mobile development", description: "Cross-platform apps." },
  { id: 12, studentId: 7, name: "Music", description: "Plays the timple." },
  { id: 13, studentId: 8, name: "Entrepreneurship", description: "Building a tech startup." },
  { id: 14, studentId: 8, name: "Languages", description: null },
];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert("student-interests", interests);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("student-interests", {
      id: { [Sequelize.Op.in]: interests.map((i) => i.id) },
    });
  },
};
