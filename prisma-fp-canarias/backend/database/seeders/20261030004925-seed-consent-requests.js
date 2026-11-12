"use strict";

const crypto = require("crypto");

const day = 24 * 60 * 60 * 1000;
const now = Date.now();

const hash = (seed) =>
  crypto.createHash("sha256").update(`demo-consent-request-${seed}`).digest("hex");

// sentById references a user (users.id); ids 100 and 101 are used here as an example.
const requests = [
  { id: 1, student_id: 1, sent_by_id: 100, sent_at: new Date(now - 10 * day), expires_at: new Date(now + 20 * day), used_at: new Date(now - 9 * day) },
  { id: 2, student_id: 2, sent_by_id: 100, sent_at: new Date(now - 10 * day), expires_at: new Date(now + 20 * day), used_at: new Date(now - 8 * day) },
  { id: 3, student_id: 3, sent_by_id: 100, sent_at: new Date(now - 7 * day), expires_at: new Date(now + 23 * day), used_at: new Date(now - 6 * day) },
  { id: 4, student_id: 4, sent_by_id: 101, sent_at: new Date(now - 7 * day), expires_at: new Date(now + 23 * day), used_at: new Date(now - 5 * day) },
  { id: 5, student_id: 5, sent_by_id: 101, sent_at: new Date(now - 3 * day), expires_at: new Date(now + 27 * day), used_at: null },
  { id: 6, student_id: 6, sent_by_id: 101, sent_at: new Date(now - 45 * day), expires_at: new Date(now - 15 * day), used_at: null },
  { id: 7, student_id: 7, sent_by_id: 100, sent_at: new Date(now - 2 * day), expires_at: new Date(now + 28 * day), used_at: null },
  { id: 8, student_id: 8, sent_by_id: 100, sent_at: new Date(now - 1 * day), expires_at: new Date(now + 29 * day), used_at: null },
].map((r) => ({ ...r, token_hash: hash(r.id) }));
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
