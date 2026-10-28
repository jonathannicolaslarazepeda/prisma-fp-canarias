import { Router } from "express";
import { educationalCenterController } from "./educational-center.controller.js";

const router = Router();

router.get("/", educationalCenterController.getAll);

router.get("/:id", educationalCenterController.getById);

router.post("/", educationalCenterController.create);

router.put("/:id", educationalCenterController.update);

router.delete("/:id", educationalCenterController.delete);

export default router;