"use strict";

const interests = [
  { id: 1, student_id: 1, name: "Web development", description: "Interested in full stack applications." },
  { id: 2, student_id: 1, name: "Video games", description: null },
  { id: 3, student_id: 2, name: "Data science", description: "Data analysis and visualization." },
  { id: 4, student_id: 2, name: "Hiking", description: "Trails around the islands." },
  { id: 5, student_id: 3, name: "Interface design", description: null },
  { id: 6, student_id: 4, name: "Cybersecurity", description: "Pentesting and system defense." },
  { id: 7, student_id: 4, name: "Photography", description: null },
  { id: 8, student_id: 5, name: "Artificial intelligence", description: "Applied machine learning." },
  { id: 9, student_id: 6, name: "System administration", description: "Infrastructure and automation." },
  { id: 10, student_id: 6, name: "Surf", description: null },
  { id: 11, student_id: 7, name: "Mobile development", description: "Cross-platform apps." },
  { id: 12, student_id: 7, name: "Music", description: "Plays the timple." },
  { id: 13, student_id: 8, name: "Entrepreneurship", description: "Building a tech startup." },
  { id: 14, student_id: 8, name: "Languages", description: null },
];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert("student_interests", interests);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("student_interests", {
      id: { [Sequelize.Op.in]: interests.map((i) => i.id) },
    });
  },
};
