
import { Router } from "express";
import { examenAuditController } from "./examen-audit.controller.js";

const router = Router();

router.get("/", examenAuditController.getAll);

router.get("/operation/create", examenAuditController.getByOperationCreate);

router.get("/:id", examenAuditController.getById);

router.post("/", examenAuditController.create);

router.put("/:id", examenAuditController.update);

router.delete("/:id", examenAuditController.delete);

export default router;
