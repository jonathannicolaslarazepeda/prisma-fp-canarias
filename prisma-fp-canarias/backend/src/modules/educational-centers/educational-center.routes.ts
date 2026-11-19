import { Router } from "express";
import { educationalCenterController } from "./educational-center.controller.js";
import { bearerAuth } from "../../middlewares/bearer-auth.middleware.js";

const router = Router();

router.use(bearerAuth);

router.get("/", educationalCenterController.getAll);

router.get("/:id", educationalCenterController.getById);

router.post("/", educationalCenterController.create);

router.put("/:id", educationalCenterController.update);

router.delete("/:id", educationalCenterController.delete);

export default router;