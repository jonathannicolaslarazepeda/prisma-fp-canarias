import { Router } from "express";
import { StudentInterestController } from "./student-interest.controller.js";
import { bearerAuth } from "../../middlewares/bearer-auth.middleware.js";

const router = Router();

router.use(bearerAuth);

router.get("/", StudentInterestController.getAll);

router.get("/students/:id", StudentInterestController.getByStudentId);

router.get("/:id", StudentInterestController.getById);

router.post("/", StudentInterestController.create);

router.put("/:id", StudentInterestController.update);

router.delete("/:id", StudentInterestController.delete);

export default router;