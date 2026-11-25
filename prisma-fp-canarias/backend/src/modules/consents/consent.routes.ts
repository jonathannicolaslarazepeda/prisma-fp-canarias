import { Router } from "express";
import { ConsentController } from "./consent.controller.js";
import { bearerAuth } from "../../middlewares/bearer-auth.middleware.js";
import { authorize } from "../rbac/authorize.middleware.js";

const router = Router();

router.use(bearerAuth);

router.get("/", authorize('consent:read'), ConsentController.getAll);

router.get("/students/:id", authorize('consent:read'), ConsentController.getByStudentId);

router.get("/:id", authorize('consent:read'), ConsentController.getById);

router.post("/", authorize('consent:create'), ConsentController.create);

router.put("/:id", authorize('consent:update'), ConsentController.update);

router.delete("/:id", authorize('consent:delete'), ConsentController.delete);

export default router;