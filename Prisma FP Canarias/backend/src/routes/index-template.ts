import { Router } from "express";
import studentRoutes from "../modules/student/student.routes";
import skillRoutes from "../modules/skill/skill.routes";
import studentSkillRoutes from "../modules/student-skill/student-skill.routes";
import studentInterestRoutes from "../modules/student-interest/student-interest.routes";
import consentRoutes from "../modules/consent/consent.routes";
import consentRequestRoutes from "../modules/consent-request/consent-request.routes";

const router = Router();

router.use("/students", studentRoutes);
router.use("/skills", skillRoutes);
router.use("/student-skills", studentSkillRoutes);
router.use("/student-interests", studentInterestRoutes);
router.use("/consents", consentRoutes);
router.use("/consent-requests", consentRequestRoutes);

export default router;