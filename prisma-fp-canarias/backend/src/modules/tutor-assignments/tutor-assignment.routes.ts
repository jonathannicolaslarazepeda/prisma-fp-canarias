
import { Router } from "express";
import { tutorAssignmentController } from "./tutor-assignment.controller.js";
import { bearerAuth } from "../../middlewares/bearer-auth.middleware.js";
import { authorize } from "../rbac/authorize.middleware.js";

const router = Router();

router.use(bearerAuth);

router.get("/", authorize('tutor-assignment:read'), tutorAssignmentController.getAll);

router.get("/:id", authorize('tutor-assignment:read'), tutorAssignmentController.getById);

router.post("/", authorize('tutor-assignment:create'), tutorAssignmentController.create);

router.put("/:id", authorize('tutor-assignment:update'), tutorAssignmentController.update);

router.delete("/:id", authorize('tutor-assignment:delete'), tutorAssignmentController.delete);

export default router;
