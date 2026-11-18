import { Router } from "express";
import { CompanyController } from "./company.controller.js";
import { bearerAuth } from "../../middlewares/bearer-auth.middleware.js";

const router = Router();

router.use(bearerAuth);

router.get("/", CompanyController.getAll);

router.get("/eagerly", CompanyController.getAllEagerly);

router.get("/eagerly/:id", CompanyController.getEagerlyById);

router.get("/:id", CompanyController.getById);

router.post("/", CompanyController.create);

router.put("/:id", CompanyController.update);

router.delete("/:id", CompanyController.delete);

export default router;
