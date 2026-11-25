import { Router } from "express";
import { StudentSkillController } from "./student-skill.controller.js";
import { bearerAuth } from "../../middlewares/bearer-auth.middleware.js";
import { authorize } from "../rbac/authorize.middleware.js";

const router = Router();

router.use(bearerAuth);

router.get("/", authorize('student-skill:read'), StudentSkillController.getAll);

router.get("/eagerly", authorize('student-skill:read'), StudentSkillController.getAllEagerly);

router.get("/eagerly/:studentId/:skillId", authorize('student-skill:read'), StudentSkillController.getEagerlyByIds);

router.get("/students/:studentId", authorize('student-skill:read'), StudentSkillController.getByStudentId);

router.get("/:studentId/:skillId", authorize('student-skill:read'), StudentSkillController.getByIds);

router.post("/", authorize('student-skill:create'), StudentSkillController.create);

router.put("/:studentId/:skillId", authorize('student-skill:update'), StudentSkillController.update);

router.delete("/:studentId/:skillId", authorize('student-skill:delete'), StudentSkillController.delete);

export default router;