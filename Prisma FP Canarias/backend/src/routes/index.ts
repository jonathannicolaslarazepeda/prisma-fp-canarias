import { Router } from "express";
import userRoutes from "../modules/users/user.routes.js";
import roleRoutes from "../modules/roles/role.routes.js";
import authTokenRoutes from "../modules/auth-tokens/auth-token.routes.js";
import permissionRoutes from "../modules/permissions/permission.routes.js";
import rolePermissionRoutes from "../modules/role-permissions/role-permission.routes.js";
import roleUserRoutes from "../modules/role-users/role-user.routes.js";


const router = Router();
router.use("/users", userRoutes);
router.use("/roles", roleRoutes);
router.use("/permissions", permissionRoutes);
router.use("/role-users", roleUserRoutes);
router.use("/role-permissions", rolePermissionRoutes);
router.use("/auth-tokens", authTokenRoutes);

export default router;