import { Router } from "express";
import { SkillController } from "./skill.controller.js";
import { bearerAuth } from "../../middlewares/bearer-auth.middleware.js";
import { authorize } from "../rbac/authorize.middleware.js";

const router = Router();

router.use(bearerAuth);

router.get("/", authorize('skill:read'), SkillController.getAll);

router.get("/:id", authorize('skill:read'), SkillController.getById);

router.post("/", authorize('skill:create'), SkillController.create);

router.put("/:id", authorize('skill:update'), SkillController.update);

router.delete("/:id", authorize('skill:delete'), SkillController.delete);

export default router;