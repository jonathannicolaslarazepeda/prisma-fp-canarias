import { Router } from "express";
import { RoleUserController } from "./role-user.controller.js";
import { bearerAuth } from "../../middlewares/bearer-auth.middleware.js";
import { authorize } from "../rbac/authorize.middleware.js";

const router = Router();

router.use(bearerAuth);

router.get("/", authorize('role-user:read'), RoleUserController.getAll);

router.get("/eagerly", authorize('role-user:read'), RoleUserController.getAllEagerly);

router.get("/eagerly/:id", authorize('role-user:read'), RoleUserController.getEagerlyById);

router.get("/:id", authorize('role-user:read'), RoleUserController.getById);

router.post("/", authorize('role-user:create'), RoleUserController.create);

router.put("/:id", authorize('role-user:update'), RoleUserController.update);

router.delete("/:id", authorize('role-user:delete'), RoleUserController.delete);

export default router;