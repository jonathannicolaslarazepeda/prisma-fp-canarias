import { Router } from "express";
import { trainingProgramController } from "./training-program.controller.js";
import { bearerAuth } from "../../middlewares/bearer-auth.middleware.js";

const router = Router();

router.use(bearerAuth);

router.get("/", trainingProgramController.getAll);

router.get("/:id", trainingProgramController.getById);

router.post("/", trainingProgramController.create);

router.put("/:id", trainingProgramController.update);

router.delete("/:id", trainingProgramController.delete);

export default router;