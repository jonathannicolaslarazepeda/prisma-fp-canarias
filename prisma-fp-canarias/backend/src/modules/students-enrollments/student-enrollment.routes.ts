
import { Router } from "express";
import { studentEnrollmentController } from "./student-enrollment.controller.js";
import { bearerAuth } from "../../middlewares/bearer-auth.middleware.js";
import { authorize } from "../rbac/authorize.middleware.js";

const router = Router();

router.use(bearerAuth);

router.get("/", authorize('student-enrollment:read'), studentEnrollmentController.getAll);

router.get("/:id", authorize('student-enrollment:read'), studentEnrollmentController.getById);

router.post("/", authorize('student-enrollment:create'), studentEnrollmentController.create);

router.put("/:id", authorize('student-enrollment:update'), studentEnrollmentController.update);

router.delete("/:id", authorize('student-enrollment:delete'), studentEnrollmentController.delete);

export default router;
