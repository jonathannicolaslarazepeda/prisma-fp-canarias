import { Router } from "express";
import companyRoutes from "../modules/companies/company.routes";
import internshipRoutes from "../modules/internships/internship.routes";
import employmentRecordRoutes from "../modules/employment-records/employment-record.routes";
import surveyRoutes from "../modules/surveys/survey.routes";
import surveyQuestionRoutes from "../modules/survey-questions/survey-question.routes";
import surveyInvitationRoutes from "../modules/survey-invitations/survey-invitation.routes";
import surveyAnswerRoutes from "../modules/survey-answers/survey-answer.routes";

const router = Router();

router.use("/companies", companyRoutes);
router.use("/internships", internshipRoutes);
router.use("/employment-records", employmentRecordRoutes);
router.use("/surveys", surveyRoutes);
router.use("/survey-questions", surveyQuestionRoutes);
router.use("/survey-invitations", surveyInvitationRoutes);
router.use("/survey-answers", surveyAnswerRoutes);

export default router;