import { Router } from "express";
import { RolePermissionController } from "./role-permission.controller.js";
import { bearerAuth } from "../../middlewares/bearer-auth.middleware.js";
import { authorize } from "../rbac/authorize.middleware.js";

const router = Router();

router.use(bearerAuth);

router.get("/", authorize('role-permission:read'), RolePermissionController.getAll);

router.get("/:id", authorize('role-permission:read'), RolePermissionController.getById);

router.post("/", authorize('role-permission:create'), RolePermissionController.create);

router.put("/:id", authorize('role-permission:update'), RolePermissionController.update);

router.delete("/:id", authorize('role-permission:delete'), RolePermissionController.delete);

export default router;