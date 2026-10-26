import { Router } from "express";
import userRoutes from "../modules/users/user.routes";
import roleRoutes from "../modules/roles/role.routes";

const router = Router();
router.use("/users", userRoutes);
router.use("/roles", roleRoutes);
router.use("/permissions", require("../modules/permissions/permission.routes").default);
router.use("/role-users", require("../modules/role-users/role-user.routes").default);
router.use("/role-permissions", require("../modules/role-permissions/role-permission.routes").default);
router.use("/auth-tokens", require("../modules/auth-tokens/auth-token.routes").default);

export default router;