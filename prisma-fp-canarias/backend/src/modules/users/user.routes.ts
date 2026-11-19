import { Router } from "express";
import { UserController } from "./user.controller.js";
import { bearerAuth } from "../../middlewares/bearer-auth.middleware.js";

const router = Router();

router.use(bearerAuth);

router.get("/", UserController.getAll);

router.get("/:id", UserController.getById);

router.post("/", UserController.create);

router.put("/:id", UserController.update);

router.delete("/:id", UserController.delete);

export default router;