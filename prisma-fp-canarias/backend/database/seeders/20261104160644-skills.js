"use strict";

const skills = [
  { id: 1, name: "JavaScript", category: "Programming", description: "Programming language for web development." },
  { id: 2, name: "TypeScript", category: "Programming", description: "Typed superset of JavaScript." },
  { id: 3, name: "SQL", category: "Databases", description: "Querying and modeling in relational databases." },
  { id: 4, name: "Node.js", category: "Backend", description: "Server-side JavaScript runtime environment." },
  { id: 5, name: "React", category: "Frontend", description: "Library for building user interfaces." },
  { id: 6, name: "Git", category: "Tools", description: "Version control and collaborative work." },
  { id: 7, name: "Teamwork", category: "Soft skills", description: "Effective collaboration in group projects." },
  { id: 8, name: "Communication", category: "Soft skills", description: "Clear spoken and written expression." },
  { id: 9, name: "English B2", category: "Languages", description: "Upper-intermediate English level." },
  { id: 10, name: "Networking", category: "Systems", description: "Network configuration and administration." },
  { id: 11, name: "Linux", category: "Systems", description: "GNU/Linux system administration." },
  { id: 12, name: "UX/UI Design", category: "Design", description: null },
];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert("skills", skills);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("skills", {
      id: { [Sequelize.Op.in]: skills.map((s) => s.id) },
    });
  },
};
