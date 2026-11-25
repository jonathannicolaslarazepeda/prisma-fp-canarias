import { Router } from "express";
import { StudentInterestController } from "./student-interest.controller.js";
import { bearerAuth } from "../../middlewares/bearer-auth.middleware.js";
import { authorize } from "../rbac/authorize.middleware.js";

const router = Router();

router.use(bearerAuth);

router.get("/", authorize('student-interest:read'), StudentInterestController.getAll);

router.get("/students/:id", authorize('student-interest:read'), StudentInterestController.getByStudentId);

router.get("/:id", authorize('student-interest:read'), StudentInterestController.getById);

router.post("/", authorize('student-interest:create'), StudentInterestController.create);

router.put("/:id", authorize('student-interest:update'), StudentInterestController.update);

router.delete("/:id", authorize('student-interest:delete'), StudentInterestController.delete);

export default router;