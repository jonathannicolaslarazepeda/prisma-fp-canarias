import { Router } from "express";
import userRoutes from "../modules/users/user.routes";
import roleRoutes from "../modules/roles/role.routes";

const router = Router();
router.use("/users", userRoutes);
router.use("/roles", roleRoutes);

export default router;