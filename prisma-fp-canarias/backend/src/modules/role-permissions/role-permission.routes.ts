import { Router } from "express";
import { RolePermissionController } from "./role-permission.controller.js";

const router = Router();

router.get("/", RolePermissionController.getAll);

router.get("/:id", RolePermissionController.getById);

router.post("/", RolePermissionController.create);

router.put("/:id", RolePermissionController.update);

router.delete("/:id", RolePermissionController.delete);

export default router;