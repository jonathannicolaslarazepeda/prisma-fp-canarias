import { Router } from "express";
import { EmploymentRecordController } from "./employment-record.controller.js";
import { bearerAuth } from "../../middlewares/bearer-auth.middleware.js";

const router = Router();

router.use(bearerAuth);

router.get("/", EmploymentRecordController.getAll);

router.get("/eagerly", EmploymentRecordController.getAllEagerly);

router.get("/eagerly/:id", EmploymentRecordController.getEagerlyById);

router.get("/student/:studentId", EmploymentRecordController.getAllByStudentId);

router.get("/student/:studentId/first-employment", EmploymentRecordController.getFirstEmployment);

router.get("/:id", EmploymentRecordController.getById);

router.post("/", EmploymentRecordController.create);

router.put("/:id", EmploymentRecordController.update);

router.delete("/:id", EmploymentRecordController.delete);

export default router;
