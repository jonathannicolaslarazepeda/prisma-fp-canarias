import { Router } from "express";
import { ConsentController } from "./consent.controller.js";
import { bearerAuth } from "../../middlewares/bearer-auth.middleware.js";

const router = Router();

router.use(bearerAuth);

router.get("/", ConsentController.getAll);

router.get("/students/:id", ConsentController.getByStudentId);

router.get("/:id", ConsentController.getById);

router.post("/", ConsentController.create);

router.put("/:id", ConsentController.update);

router.delete("/:id", ConsentController.delete);

export default router;