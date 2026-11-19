"use strict";

const now = new Date();

const students = [
  { id: 1, user_id: 1, national_id: "43123456A", first_name: "Aarón", last_name: "Hernández Pérez", email: "aaron.hernandez@example.com", phone: "600111001", birth_date: "2002-03-14" },
  { id: 2, user_id: 2, national_id: "43123457B", first_name: "Yaiza", last_name: "Rodríguez Santana", email: "yaiza.rodriguez@example.com", phone: "600111002", birth_date: "2001-07-22" },
  { id: 3, user_id: 3, national_id: "43123458C", first_name: "Airam", last_name: "González Suárez", email: "airam.gonzalez@example.com", phone: "600111003", birth_date: "2003-01-09" },
  { id: 4, user_id: 4, national_id: "43123459D", first_name: "Nayra", last_name: "Martín Cabrera", email: "nayra.martin@example.com", phone: null, birth_date: "2000-11-30" },
  { id: 5, user_id: 5, national_id: "43123460E", first_name: "Dailos", last_name: "Díaz Medina", email: "dailos.diaz@example.com", phone: "600111005", birth_date: "2002-05-18" },
  { id: 6, user_id: 6, national_id: "43123461F", first_name: "Cristo", last_name: "Alonso Ramos", email: "cristo.alonso@example.com", phone: "600111006", birth_date: null },
  { id: 7, user_id: 7, national_id: "43123462G", first_name: "Idaira", last_name: "Báez Quintana", email: "idaira.baez@example.com", phone: "600111007", birth_date: "2001-09-05" },
  { id: 8, user_id: 8, national_id: "43123463H", first_name: "Jonay", last_name: "Castellano Rivero", email: "jonay.castellano@example.com", phone: null, birth_date: "2003-12-27" },
];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      "students",
      students.map((s) => ({ ...s, created_at: now, updated_at: now }))
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("students", {
      id: { [Sequelize.Op.in]: students.map((s) => s.id) },
    });
  },
};
