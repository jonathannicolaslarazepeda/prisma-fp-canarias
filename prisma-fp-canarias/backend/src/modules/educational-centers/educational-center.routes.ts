import { Router } from "express";
import { educationalCenterController } from "./educational-center.controller.js";
import { bearerAuth } from "../../middlewares/bearer-auth.middleware.js";
import { authorize } from "../rbac/authorize.middleware.js";

const router = Router();

router.use(bearerAuth);

router.get("/", authorize('educational-center:read'), educationalCenterController.getAll);

router.get("/:id", authorize('educational-center:read'), educationalCenterController.getById);

router.post("/", authorize('educational-center:create'), educationalCenterController.create);

router.put("/:id", authorize('educational-center:update'), educationalCenterController.update);

router.delete("/:id", authorize('educational-center:delete'), educationalCenterController.delete);

export default router;
