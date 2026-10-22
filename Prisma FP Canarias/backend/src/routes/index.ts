import { Router } from "express";
import educationalCenterRoutes from "../modules/educational-centers/educational-center.routes.js";


const router = Router();


router.use("/educational-centers", educationalCenterRoutes);
export default router;