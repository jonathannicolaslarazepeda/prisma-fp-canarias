import { Router } from "express";
import { InternshipController } from "./internship.controller.js";

const router = Router();

router.get("/", InternshipController.getAll);

router.get("/eagerly", InternshipController.getAllEagerly);

router.get("/eagerly/:id", InternshipController.getEagerlyById);

router.get("/:id", InternshipController.getById);

router.post("/", InternshipController.create);

router.put("/:id", InternshipController.update);

router.delete("/:id", InternshipController.delete);

export default router;
