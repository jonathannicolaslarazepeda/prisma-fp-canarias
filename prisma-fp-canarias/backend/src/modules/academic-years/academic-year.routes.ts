
import { Router } from "express";
import { academicYearController } from "./academic-year.controller.js";
import { bearerAuth } from "../../middlewares/bearer-auth.middleware.js";
import { authorize } from "../rbac/authorize.middleware.js";

const router = Router();

router.use(bearerAuth);

router.get("/", authorize('academic-year:read'), academicYearController.getAll);

router.get("/:id", authorize('academic-year:read'), academicYearController.getById);

router.post("/", authorize('academic-year:create'), academicYearController.create);

router.put("/:id", authorize('academic-year:update'), academicYearController.update);

router.delete("/:id", authorize('academic-year:delete'), academicYearController.delete);

export default router;
