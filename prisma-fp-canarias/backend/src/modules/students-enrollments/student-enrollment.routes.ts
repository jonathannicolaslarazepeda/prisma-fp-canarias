import { Router } from "express";
import { studentEnrollmentController } from "./student-enrollment.controller.js";

const router = Router();

router.get("/", studentEnrollmentController.getAll);

router.get("/:id", studentEnrollmentController.getById);

router.post("/", studentEnrollmentController.create);

router.put("/:id", studentEnrollmentController.update);

router.delete("/:id", studentEnrollmentController.delete);

export default router;