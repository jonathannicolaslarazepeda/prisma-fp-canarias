import { Router } from "express";
import { SkillController } from "./skill.controller.js";

const router = Router();

router.get("/", SkillController.getAll);

router.get("/:id", SkillController.getById);

router.post("/", SkillController.create);

router.put("/:id", SkillController.update);

router.delete("/:id", SkillController.delete);

export default router;