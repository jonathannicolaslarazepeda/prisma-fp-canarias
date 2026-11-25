import { Router } from "express";
import { StudentController } from "./student.controller.js";
import { bearerAuth } from "../../middlewares/bearer-auth.middleware.js";
import { authorize } from "../rbac/authorize.middleware.js";

const router = Router();

router.use(bearerAuth);

router.get("/", authorize('student:read'), StudentController.getAll);

router.get("/:name_search/skills", authorize('student:read'), StudentController.getStudentWithSkillsSearchByName);

router.get("/:id", authorize('student:read'), StudentController.getById);

router.post("/", authorize('student:create'), StudentController.create);

router.put("/:id", authorize('student:update'), StudentController.update);

router.delete("/:id", authorize('student:delete'), StudentController.delete);

export default router;