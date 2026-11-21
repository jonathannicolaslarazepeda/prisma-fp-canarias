"use strict";

const day = 24 * 60 * 60 * 1000;
const now = Date.now();

const consents = [
  { id: 1, student_id: 1, consent_request_id: 1, purpose: "Personal data processing", status: "granted", policy_version: "v1.0", recorded_at: new Date(now - 9 * day) },
  { id: 2, student_id: 2, consent_request_id: 2, purpose: "Personal data processing", status: "granted", policy_version: "v1.0", recorded_at: new Date(now - 8 * day) },
  { id: 3, student_id: 3, consent_request_id: 3, purpose: "Data sharing with partner companies", status: "denied", policy_version: "v1.0", recorded_at: new Date(now - 6 * day) },
  { id: 4, student_id: 4, consent_request_id: 4, purpose: "Data sharing with partner companies", status: "granted", policy_version: "v1.1", recorded_at: new Date(now - 5 * day) },
  { id: 5, student_id: 7, consent_request_id: 7, purpose: "Sending communications", status: "granted", policy_version: "v1.1", recorded_at: new Date(now - 1 * day) },
  { id: 6, student_id: 5, consent_request_id: null, purpose: "Personal data processing", status: "granted", policy_version: "v1.0", recorded_at: new Date(now - 20 * day) },
  { id: 7, student_id: 6, consent_request_id: null, purpose: "Personal data processing", status: "revoked", policy_version: "v1.0", recorded_at: new Date(now - 12 * day) },
  { id: 8, student_id: 8, consent_request_id: null, purpose: "Personal data processing", status: "granted", policy_version: "v1.1", recorded_at: new Date(now - 2 * day) },
];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert("consents", consents);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("consents", {
      id: { [Sequelize.Op.in]: consents.map((c) => c.id) },
    });
  },
};
