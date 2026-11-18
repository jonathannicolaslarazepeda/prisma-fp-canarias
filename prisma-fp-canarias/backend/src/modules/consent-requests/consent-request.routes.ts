import { Router } from "express";
import { ConsentRequestController } from "./consent-request.controller.js";
import { bearerAuth } from "../../middlewares/bearer-auth.middleware.js";

const router = Router();

router.use(bearerAuth);

router.get("/", ConsentRequestController.getAll);

router.get("/students/:id", ConsentRequestController.getByStudentId);

router.get("/:id", ConsentRequestController.getById);

router.post("/", ConsentRequestController.create);

router.put("/:id", ConsentRequestController.update);

router.delete("/:id", ConsentRequestController.delete);

export default router;