import { Router } from "express";
import { tutorAssignmentController } from "./tutor-assignment.controller.js";

const router = Router();

router.get("/", tutorAssignmentController.getAll);

router.get("/:id", tutorAssignmentController.getById);

router.post("/", tutorAssignmentController.create);

router.put("/:id", tutorAssignmentController.update);

router.delete("/:id", tutorAssignmentController.delete)

export default router;