import { Router } from "express";
import { RoleUserController } from "./role-user.controller.js";
import { bearerAuth } from "../../middlewares/bearer-auth.middleware.js";

const router = Router();

router.use(bearerAuth);

router.get("/", RoleUserController.getAll);

router.get("/eagerly", RoleUserController.getAllEagerly);

router.get("/eagerly/:id", RoleUserController.getEagerlyById);

router.get("/:id", RoleUserController.getById);

router.post("/", RoleUserController.create);

router.put("/:id", RoleUserController.update);

router.delete("/:id", RoleUserController.delete);

export default router;