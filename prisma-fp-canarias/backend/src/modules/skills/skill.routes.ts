import { Router } from "express";
import { SkillController } from "./skill.controller.js";
import { bearerAuth } from "../../middlewares/bearer-auth.middleware.js";

const router = Router();

router.use(bearerAuth);

router.get("/", SkillController.getAll);

router.get("/:id", SkillController.getById);

router.post("/", SkillController.create);

router.put("/:id", SkillController.update);

router.delete("/:id", SkillController.delete);

export default router;