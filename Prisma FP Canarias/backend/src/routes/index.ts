import { Router } from "express";
import studentRoutes from "../modules/student/student.routes.js";
import skillRoutes from "../modules/skill/skill.routes.js";
import studentSkillRoutes from "../modules/student-skill/student-skill.routes.js";
import studentInterestRoutes from "../modules/student-interest/student-interest.routes.js";
import consentRoutes from "../modules/consent/consent.routes.js";
import consentRequestRoutes from "../modules/consent-request/consent-request.routes.js";

const router = Router();

router.use("/students", studentRoutes);
router.use("/skills", skillRoutes);
router.use("/student-skills", studentSkillRoutes);
router.use("/student-interests", studentInterestRoutes);
router.use("/consents", consentRoutes);
router.use("/consent-requests", consentRequestRoutes);

export default router;