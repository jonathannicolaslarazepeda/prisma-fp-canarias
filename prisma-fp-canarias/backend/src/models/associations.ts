import { Company } from "../modules/companies/company.model";
import { Internship } from "../modules/internships/internship.model";
import { EmploymentRecord } from "../modules/employment-records/employment-record.model";
import { Survey } from "../modules/surveys/survey.model";
import { SurveyQuestion } from "../modules/survey-questions/survey-question.model";
import { SurveyInvitation } from "../modules/survey-invitations/survey-invitation.model";
import { SurveyAnswer } from "../modules/survey-answers/survey-answer.model";
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
// Pendiente: módulos Student y StudentEnrollment.
// import { Student } from "../modules/students/student.model";
// import { StudentEnrollment } from "../modules/student-enrollments/student-enrollment.model";

export function defineAssociations() {
    Company.hasMany(Internship, { foreignKey: "companyId", as: "internships" });
    Internship.belongsTo(Company, { foreignKey: "companyId", as: "company" });

    Company.hasMany(EmploymentRecord, { foreignKey: "companyId", as: "employmentRecords" });
    EmploymentRecord.belongsTo(Company, { foreignKey: "companyId", as: "company" });

    Internship.hasMany(EmploymentRecord, { foreignKey: "internshipId", as: "employmentRecords" });
    EmploymentRecord.belongsTo(Internship, { foreignKey: "internshipId", as: "internship" });

    Survey.hasMany(SurveyQuestion, { foreignKey: "surveyId", as: "questions" });
    SurveyQuestion.belongsTo(Survey, { foreignKey: "surveyId", as: "survey" });

    Survey.hasMany(SurveyInvitation, { foreignKey: "surveyId", as: "invitations" });
    SurveyInvitation.belongsTo(Survey, { foreignKey: "surveyId", as: "survey" });

    SurveyInvitation.hasMany(SurveyAnswer, { foreignKey: "invitationId", as: "answers" });
    SurveyAnswer.belongsTo(SurveyInvitation, { foreignKey: "invitationId", as: "invitation" });

    SurveyQuestion.hasMany(SurveyAnswer, { foreignKey: "questionId", as: "answers" });
    SurveyAnswer.belongsTo(SurveyQuestion, { foreignKey: "questionId", as: "question" });

    // Pendiente: activar cuando existan Student y StudentEnrollment.
    // StudentEnrollment.hasMany(Internship, { foreignKey: "enrollmentId", as: "internships" });
    // Internship.belongsTo(StudentEnrollment, { foreignKey: "enrollmentId", as: "enrollment" });

    // Student.hasMany(EmploymentRecord, { foreignKey: "studentId", as: "employmentRecords" });
    // EmploymentRecord.belongsTo(Student, { foreignKey: "studentId", as: "student" });

    // Student.hasMany(SurveyInvitation, { foreignKey: "studentId", as: "surveyInvitations" });
    // SurveyInvitation.belongsTo(Student, { foreignKey: "studentId", as: "student" });

    
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