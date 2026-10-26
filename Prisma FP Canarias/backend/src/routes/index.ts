import { Router } from "express";
import educationalCenterRoutes from "../modules/educational-centers/educational-center.routes.js";
import academicYearRoutes from "../modules/academic-years/academic-year.routes.js";
import professionalFamilyRoutes from "../modules/professional-families/professional-family.routes.js";
import trainingProgramRoutes from "../modules/training-programs/training-program.routes.js";
import tutorAssignmentRoutes from "../modules/tutor-assignments/tutor-assignment.routes.js";
import studentEnrollmentRoutes from "../modules/students-enrollments/student-enrollment.routes.js";


const router = Router();


router.use("/educational-centers", educationalCenterRoutes);

router.use("/academic-years", academicYearRoutes);

router.use("/professional-families", professionalFamilyRoutes);

router.use("/training-programs", trainingProgramRoutes);

router.use("/tutor-assignments", tutorAssignmentRoutes);

router.use("/student-enrollments", studentEnrollmentRoutes);


export default router;
