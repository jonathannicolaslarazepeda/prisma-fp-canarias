
import { Router } from "express";
import { academicYearController } from "./academic-year.controller.js";
import { bearerAuth } from "../../middlewares/bearer-auth.middleware.js";

const router = Router();

router.use(bearerAuth);

router.get("/", academicYearController.getAll);

router.get("/:id", academicYearController.getById);

router.post("/", academicYearController.create);

router.put("/:id", academicYearController.update);

router.delete("/:id", academicYearController.delete);

export default router;
