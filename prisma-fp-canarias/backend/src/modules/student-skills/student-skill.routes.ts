import { Router } from "express";
import { StudentSkillController } from "./student-skill.controller.js";

const router = Router();

router.get("/", StudentSkillController.getAll);

router.get("/eagerly", StudentSkillController.getAllEagerly);

router.get("/eagerly/:studentId/:skillId", StudentSkillController.getEagerlyByIds);

router.get("/students/:studentId", StudentSkillController.getByStudentId);

router.get("/:studentId/:skillId", StudentSkillController.getByIds);

router.post("/", StudentSkillController.create);

router.put("/:studentId/:skillId", StudentSkillController.update);

router.delete("/:studentId/:skillId", StudentSkillController.delete);

export default router;