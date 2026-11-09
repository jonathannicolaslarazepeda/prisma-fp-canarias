"use strict";

const crypto = require("crypto");

const day = 24 * 60 * 60 * 1000;
const now = Date.now();

const hash = (seed) =>
  crypto.createHash("sha256").update(`demo-consent-request-${seed}`).digest("hex");

// sentById references a user (users.id); ids 100 and 101 are used here as an example.
const requests = [
  { id: 1, studentId: 1, sentById: 100, sentAt: new Date(now - 10 * day), expiresAt: new Date(now + 20 * day), usedAt: new Date(now - 9 * day) },
  { id: 2, studentId: 2, sentById: 100, sentAt: new Date(now - 10 * day), expiresAt: new Date(now + 20 * day), usedAt: new Date(now - 8 * day) },
  { id: 3, studentId: 3, sentById: 100, sentAt: new Date(now - 7 * day), expiresAt: new Date(now + 23 * day), usedAt: new Date(now - 6 * day) },
  { id: 4, studentId: 4, sentById: 101, sentAt: new Date(now - 7 * day), expiresAt: new Date(now + 23 * day), usedAt: new Date(now - 5 * day) },
  { id: 5, studentId: 5, sentById: 101, sentAt: new Date(now - 3 * day), expiresAt: new Date(now + 27 * day), usedAt: null },
  { id: 6, studentId: 6, sentById: 101, sentAt: new Date(now - 45 * day), expiresAt: new Date(now - 15 * day), usedAt: null },
  { id: 7, studentId: 7, sentById: 100, sentAt: new Date(now - 2 * day), expiresAt: new Date(now + 28 * day), usedAt: new Date(now - 1 * day) },
  { id: 8, studentId: 8, sentById: 100, sentAt: new Date(now - 1 * day), expiresAt: new Date(now + 29 * day), usedAt: null },
].map((r) => ({ ...r, tokenHash: hash(r.id) }));

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert("consent_requests", requests);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("consent_requests", {
      id: { [Sequelize.Op.in]: requests.map((r) => r.id) },
    });
  },
};
