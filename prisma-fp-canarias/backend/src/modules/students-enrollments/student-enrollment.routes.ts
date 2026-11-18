import { Router } from "express";
import { studentEnrollmentController } from "./student-enrollment.controller.js";
import { bearerAuth } from "../../middlewares/bearer-auth.middleware.js";

const router = Router();

router.use(bearerAuth);

router.get("/", studentEnrollmentController.getAll);

router.get("/:id", studentEnrollmentController.getById);

router.post("/", studentEnrollmentController.create);

router.put("/:id", studentEnrollmentController.update);

router.delete("/:id", studentEnrollmentController.delete);

export default router;