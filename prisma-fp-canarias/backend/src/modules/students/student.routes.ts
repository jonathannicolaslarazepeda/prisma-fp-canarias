import { Router } from "express";
import { StudentController } from "./student.controller.js";
import { bearerAuth } from "../../middlewares/bearer-auth.middleware.js";

const router = Router();

router.use(bearerAuth);

router.get("/", StudentController.getAll);

router.get("/:name_search/skills", StudentController.getStudentWithSkillsSearchByName);

router.get("/:id", StudentController.getById);

router.post("/", StudentController.create);

router.put("/:id", StudentController.update);

router.delete("/:id", StudentController.delete);

export default router;