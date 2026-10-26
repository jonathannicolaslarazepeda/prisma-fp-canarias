import { User } from "../modules/users/user.model.js";
import { Role } from "../modules/roles/role.model.js";
import { Permission } from "../modules/permissions/permission.model.js";
import { RoleUser } from "../modules/role-users/role-user.model.js";
import { RolePermission } from "../modules/role-permissions/role-permission.model.js";
import { AuthToken } from "../modules/auth-tokens/auth-token.model.js";
import { educationalCenter } from "../modules/educational-centers/educational-center.model.js";
import { academicYear } from "../modules/academic-years/academic-year.model.js";
import { professionalFamily } from "../modules/professional-families/professional-family.model.js";
import { trainingProgram } from "../modules/training-programs/training-program.model.js";
import { tutorAssignment } from "../modules/tutor-assignments/tutor-assignment.model.js";
import { studentEnrollment } from "../modules/students-enrollments/student-enrollment.model.js";

export function defineAssociations() {

    // =========================
    // USER <-> USER ROLE
    // =========================

    User.hasMany(RoleUser, { foreignKey: "userId", as: "role_users" });
    RoleUser.belongsTo(User, { foreignKey: "userId", as: "user" });


    // =========================
    // ROLE <-> USER ROLE
    // =========================

    Role.hasMany(RoleUser, { foreignKey: "roleId", as: "role_users" });
    RoleUser.belongsTo(Role, { foreignKey: "roleId", as: "role" });


    // =========================
    // ROLE <-> ROLE PERMISSION
    // =========================

    Role.hasMany(RolePermission, { foreignKey: "roleId", as: "role_permissions" });
    RolePermission.belongsTo(Role, { foreignKey: "roleId", as: "role" });


    // =========================
    // PERMISSION <-> ROLE PERMISSION
    // =========================

    Permission.hasMany(RolePermission, { foreignKey: "permissionId", as: "role_permissions", });
    RolePermission.belongsTo(Permission, { foreignKey: "permissionId", as: "permission", });


    // =========================
    // USER <-> AUTH TOKEN
    // =========================

    User.hasMany(AuthToken, { foreignKey: "userId", as: "auth_tokens" });
    AuthToken.belongsTo(User, { foreignKey: "userId", as: "user" });


    // =========================
    // MANY-TO-MANY
    // =========================

    User.belongsToMany(Role, { through: RoleUser, foreignKey: "userId", otherKey: "roleId", as: "roles" });
    Role.belongsToMany(User, { through: RoleUser, foreignKey: "roleId", otherKey: "userId", as: "users" });
    Role.belongsToMany(Permission, { through: RolePermission, foreignKey: "roleId", otherKey: "permissionId", as: "permissions" });
    Permission.belongsToMany(Role, { through: RolePermission, foreignKey: "permissionId", otherKey: "roleId", as: "roles" });

    // Educational Center - Training Program (1:N)
    educationalCenter.hasMany(trainingProgram, {
        foreignKey: "centerId", as: "trainingPrograms"
    });
    trainingProgram.belongsTo(educationalCenter, {
        foreignKey: "centerId", as: "educationalCenter"
    });

    // Professional Family - Training Program (1:N)
    professionalFamily.hasMany(trainingProgram, {
        foreignKey: "familyId", as: "trainingPrograms"
    });
    trainingProgram.belongsTo(professionalFamily, {
        foreignKey: "familyId", as: "professionalFamily"
    });

    // Training Program - Tutor Assignment (1:N)
    trainingProgram.hasMany(tutorAssignment, {
        foreignKey: "programId", as: "tutorAssignments"
    });
    tutorAssignment.belongsTo(trainingProgram, {
        foreignKey: "programId", as: "trainingProgram"
    });

    // Academic Year - Tutor Assignment (1:N)
    academicYear.hasMany(tutorAssignment, {
        foreignKey: "academicYearId", as: "tutorAssignments"
    });
    tutorAssignment.belongsTo(academicYear, {
        foreignKey: "academicYearId", as: "academicYear"
    });

    // Training Program - Student Enrollment (1:N)
    trainingProgram.hasMany(studentEnrollment, {
        foreignKey: "programId", as: "studentEnrollments"
    });
    studentEnrollment.belongsTo(trainingProgram, {
        foreignKey: "programId", as: "trainingProgram"
    });

    // Academic Year - Student Enrollment (1:N)
    academicYear.hasMany(studentEnrollment, {
        foreignKey: "academicYearId", as: "studentEnrollments"
    });
    studentEnrollment.belongsTo(academicYear, {
        foreignKey: "academicYearId", as: "academicYear"
    });
};