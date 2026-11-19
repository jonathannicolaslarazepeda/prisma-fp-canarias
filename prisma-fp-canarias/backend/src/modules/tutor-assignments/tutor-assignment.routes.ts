import { Router } from "express";
import { tutorAssignmentController } from "./tutor-assignment.controller.js";
import { bearerAuth } from "../../middlewares/bearer-auth.middleware.js";

const router = Router();

router.use(bearerAuth);

router.get("/", tutorAssignmentController.getAll);

router.get("/:id", tutorAssignmentController.getById);

router.post("/", tutorAssignmentController.create);

router.put("/:id", tutorAssignmentController.update);

router.delete("/:id", tutorAssignmentController.delete)

export default router;