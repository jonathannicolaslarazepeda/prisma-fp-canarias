import { Router } from "express";
import { SurveyAnswerController } from "./survey-answer.controller.js";
import { bearerAuth } from "../../middlewares/bearer-auth.middleware.js";

const router = Router();

// Pública (antes de bearerAuth): enviar las respuestas desde el enlace de la encuesta.
router.post("/token/:token", SurveyAnswerController.submitByToken);

router.use(bearerAuth);

router.get("/", SurveyAnswerController.getAll);

router.get("/eagerly", SurveyAnswerController.getAllEagerly);

router.get("/eagerly/:id", SurveyAnswerController.getEagerlyById);

router.get("/:id", SurveyAnswerController.getById);

router.post("/", SurveyAnswerController.create);

router.put("/:id", SurveyAnswerController.update);

router.delete("/:id", SurveyAnswerController.delete);

export default router;
