"use strict";

const day = 24 * 60 * 60 * 1000;
const now = Date.now();

const consents = [
  { id: 1, studentId: 1, consentRequestId: 1, purpose: "Personal data processing", status: "granted", policyVersion: "v1.0", recordedAt: new Date(now - 9 * day) },
  { id: 2, studentId: 2, consentRequestId: 2, purpose: "Personal data processing", status: "granted", policyVersion: "v1.0", recordedAt: new Date(now - 8 * day) },
  { id: 3, studentId: 3, consentRequestId: 3, purpose: "Data sharing with partner companies", status: "denied", policyVersion: "v1.0", recordedAt: new Date(now - 6 * day) },
  { id: 4, studentId: 4, consentRequestId: 4, purpose: "Data sharing with partner companies", status: "granted", policyVersion: "v1.1", recordedAt: new Date(now - 5 * day) },
  { id: 5, studentId: 7, consentRequestId: 7, purpose: "Sending communications", status: "granted", policyVersion: "v1.1", recordedAt: new Date(now - 1 * day) },
  { id: 6, studentId: 5, consentRequestId: null, purpose: "Personal data processing", status: "granted", policyVersion: "v1.0", recordedAt: new Date(now - 20 * day) },
  { id: 7, studentId: 6, consentRequestId: null, purpose: "Personal data processing", status: "revoked", policyVersion: "v1.0", recordedAt: new Date(now - 12 * day) },
  { id: 8, studentId: 8, consentRequestId: null, purpose: "Personal data processing", status: "granted", policyVersion: "v1.1", recordedAt: new Date(now - 2 * day) },
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
