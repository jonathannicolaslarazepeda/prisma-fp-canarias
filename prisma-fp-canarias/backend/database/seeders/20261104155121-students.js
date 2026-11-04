"use strict";

const now = new Date();

const students = [
  { id: 1, userId: 1, nationalId: "43123456A", firstName: "Aarón", lastName: "Hernández Pérez", email: "aaron.hernandez@example.com", phone: "600111001", birthDate: "2002-03-14" },
  { id: 2, userId: 2, nationalId: "43123457B", firstName: "Yaiza", lastName: "Rodríguez Santana", email: "yaiza.rodriguez@example.com", phone: "600111002", birthDate: "2001-07-22" },
  { id: 3, userId: 3, nationalId: "43123458C", firstName: "Airam", lastName: "González Suárez", email: "airam.gonzalez@example.com", phone: "600111003", birthDate: "2003-01-09" },
  { id: 4, userId: 4, nationalId: "43123459D", firstName: "Nayra", lastName: "Martín Cabrera", email: "nayra.martin@example.com", phone: null, birthDate: "2000-11-30" },
  { id: 5, userId: 5, nationalId: "43123460E", firstName: "Dailos", lastName: "Díaz Medina", email: "dailos.diaz@example.com", phone: "600111005", birthDate: "2002-05-18" },
  { id: 6, userId: 6, nationalId: "43123461F", firstName: "Cristo", lastName: "Alonso Ramos", email: "cristo.alonso@example.com", phone: "600111006", birthDate: null },
  { id: 7, userId: 7, nationalId: "43123462G", firstName: "Idaira", lastName: "Báez Quintana", email: "idaira.baez@example.com", phone: "600111007", birthDate: "2001-09-05" },
  { id: 8, userId: 8, nationalId: "43123463H", firstName: "Jonay", lastName: "Castellano Rivero", email: "jonay.castellano@example.com", phone: null, birthDate: "2003-12-27" },
];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      "students",
      students.map((s) => ({ ...s, createdAt: now, updatedAt: now }))
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("students", {
      id: { [Sequelize.Op.in]: students.map((s) => s.id) },
    });
  },
};
