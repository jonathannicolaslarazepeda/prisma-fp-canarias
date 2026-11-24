import { Router } from "express";
import { SurveyController } from "./survey.controller.js";
import { bearerAuth } from "../../middlewares/bearer-auth.middleware.js";

const router = Router();

router.use(bearerAuth);

router.get("/", SurveyController.getAll);

router.get("/eagerly", SurveyController.getAllEagerly);

router.get("/eagerly/:id", SurveyController.getEagerlyById);

router.get("/active", SurveyController.getActive);

router.get("/:id/summary", SurveyController.getSummary);

router.get("/:id", SurveyController.getById);

router.post("/", SurveyController.create);

router.put("/:id", SurveyController.update);

router.delete("/:id", SurveyController.delete);

export default router;
