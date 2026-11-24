
import { Router } from "express";
import { professionalFamilyController } from "./professional-family.controller.js";
import { bearerAuth } from "../../middlewares/bearer-auth.middleware.js";
import { authorize } from "../rbac/authorize.middleware.js";

const router = Router();

router.use(bearerAuth);

router.get("/", authorize('professional-family:read'), professionalFamilyController.getAll);

router.get("/:id", authorize('professional-family:read'), professionalFamilyController.getById);

router.post("/", authorize('professional-family:create'), professionalFamilyController.create);

router.put("/:id", authorize('professional-family:update'), professionalFamilyController.update);

router.delete("/:id", authorize('professional-family:delete'), professionalFamilyController.delete);

export default router;
