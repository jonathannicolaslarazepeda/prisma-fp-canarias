import { Router } from "express";
import { professionalFamilyController } from "./professional-family.controller.js";
import { bearerAuth } from "../../middlewares/bearer-auth.middleware.js";

const router = Router();

router.use(bearerAuth);

router.get("/", professionalFamilyController.getAll);

router.get("/:id", professionalFamilyController.getById);

router.post("/", professionalFamilyController.create);

router.put("/:id", professionalFamilyController.update);

router.delete("/:id", professionalFamilyController.delete);

export default router;