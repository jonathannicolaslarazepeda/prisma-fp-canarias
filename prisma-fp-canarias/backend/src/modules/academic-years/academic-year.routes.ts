
import { Router } from "express";
import { academicYearController } from "./academic-year.controller.js";

const router = Router();

router.get("/", academicYearController.getAll);

router.get("/:id", academicYearController.getById);

router.post("/", academicYearController.create);

router.put("/:id", academicYearController.update);

router.delete("/:id", academicYearController.delete);

export default router;
