import { Router } from "express";
import { SurveyQuestionController } from "./survey-question.controller";

const router = Router();

router.get("/", SurveyQuestionController.getAll);

router.get("/eagerly", SurveyQuestionController.getAllEagerly);

router.get("/eagerly/:id", SurveyQuestionController.getEagerlyById);

router.get("/:id", SurveyQuestionController.getById);

router.post("/", SurveyQuestionController.create);

router.put("/:id", SurveyQuestionController.update);

router.delete("/:id", SurveyQuestionController.delete);

export default router;
