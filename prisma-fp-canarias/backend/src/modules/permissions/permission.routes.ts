import { Router } from "express";
import { PermissionController } from "./permission.controller.js";
import { bearerAuth } from "../../middlewares/bearer-auth.middleware.js";

const router = Router();

router.use(bearerAuth);

router.get("/", PermissionController.getAll);

router.get("/:id", PermissionController.getById);

router.post("/", PermissionController.create);

router.put("/:id", PermissionController.update);

router.delete("/:id", PermissionController.delete);

export default router;