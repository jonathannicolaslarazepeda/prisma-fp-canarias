import { Router } from "express";
import { examenFichaController } from "./examen-ficha.controller.js";

const router = Router();

router.get("/", examenFichaController.getAll);

router.get("/:id", examenFichaController.getById);

router.post("/", examenFichaController.create);

router.put("/:id", examenFichaController.update);

router.delete("/:id", examenFichaController.delete);

export default router;
