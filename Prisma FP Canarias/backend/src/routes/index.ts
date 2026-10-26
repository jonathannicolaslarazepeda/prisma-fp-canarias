import { Router } from "express";
import userRoutes from "../modules/users/user.routes";
import roleRoutes from "../modules/roles/role.routes";
import educationalCenterRoutes from "../modules/educational-centers/educational-center.routes.js";
import academicYearRoutes from "../modules/academic-years/academic-year.routes.js";
import professionalFamilyRoutes from "../modules/professional-families/professional-family.routes.js";
import trainingProgramRoutes from "../modules/training-programs/training-program.routes.js";
import tutorAssignmentRoutes from "../modules/tutor-assignments/tutor-assignment.routes.js";
import studentEnrollmentRoutes from "../modules/students-enrollments/student-enrollment.routes.js";


const router = Router();
router.use("/users", userRoutes);
router.use("/roles", roleRoutes);
router.use("/permissions", require("../modules/permissions/permission.routes").default);
router.use("/role-users", require("../modules/role-users/role-user.routes").default);
router.use("/role-permissions", require("../modules/role-permissions/role-permission.routes").default);
router.use("/auth-tokens", require("../modules/auth-tokens/auth-token.routes").default);


router.use("/educational-centers", educationalCenterRoutes);

router.use("/academic-years", academicYearRoutes);

router.use("/professional-families", professionalFamilyRoutes);

router.use("/training-programs", trainingProgramRoutes);

router.use("/tutor-assignments", tutorAssignmentRoutes);

router.use("/student-enrollments", studentEnrollmentRoutes);


export default router;
