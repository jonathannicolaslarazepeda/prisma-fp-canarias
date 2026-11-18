import { Router } from "express";
import { SurveyQuestionController } from "./survey-question.controller.js";
import { bearerAuth } from "../../middlewares/bearer-auth.middleware.js";

const router = Router();

router.use(bearerAuth);

router.get("/", SurveyQuestionController.getAll);

router.get("/eagerly", SurveyQuestionController.getAllEagerly);

router.get("/eagerly/:id", SurveyQuestionController.getEagerlyById);

router.get("/:id", SurveyQuestionController.getById);

router.post("/", SurveyQuestionController.create);

router.put("/:id", SurveyQuestionController.update);

router.delete("/:id", SurveyQuestionController.delete);

export default router;
