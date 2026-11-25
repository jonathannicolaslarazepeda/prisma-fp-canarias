import { Router } from "express";
import { ConsentRequestController } from "./consent-request.controller.js";
import { bearerAuth } from "../../middlewares/bearer-auth.middleware.js";
import { authorize } from "../rbac/authorize.middleware.js";

const router = Router();

router.use(bearerAuth);

router.get("/", authorize('consent-request:read'), ConsentRequestController.getAll);

router.get("/students/:id", authorize('consent-request:read'), ConsentRequestController.getByStudentId);

router.get("/:id", authorize('consent-request:read'), ConsentRequestController.getById);

router.post("/", authorize('consent-request:create'), ConsentRequestController.create);

router.put("/:id", authorize('consent-request:update'), ConsentRequestController.update);

router.delete("/:id", authorize('consent-request:delete'), ConsentRequestController.delete);

export default router;