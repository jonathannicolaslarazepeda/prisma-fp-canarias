import { Router } from "express";
import { RoleUserController } from "./role-user.controller";

const router = Router();

router.get("/", RoleUserController.getAll);

router.get("/eagerly", RoleUserController.getAllEagerly);

router.get("/eagerly/:id", RoleUserController.getEagerlyById);

router.get("/:id", RoleUserController.getById);

router.post("/", RoleUserController.create);

router.put("/:id", RoleUserController.update);

router.delete("/:id", RoleUserController.delete);

export default router;