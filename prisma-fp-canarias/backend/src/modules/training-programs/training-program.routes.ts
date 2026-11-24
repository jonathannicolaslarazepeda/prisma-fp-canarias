
import { Router } from "express";
import { trainingProgramController } from "./training-program.controller.js";
import { bearerAuth } from "../../middlewares/bearer-auth.middleware.js";
import { authorize } from "../rbac/authorize.middleware.js";

const router = Router();

router.use(bearerAuth);

router.get("/", authorize('training-program:read'), trainingProgramController.getAll);

router.get("/:id", authorize('training-program:read'), trainingProgramController.getById);

router.post("/", authorize('training-program:create'), trainingProgramController.create);

router.put("/:id", authorize('training-program:update'), trainingProgramController.update);

router.delete("/:id", authorize('training-program:delete'), trainingProgramController.delete);

export default router;
