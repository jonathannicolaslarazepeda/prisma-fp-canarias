import { Company } from "../modules/companies/company.model";
import { Internship } from "../modules/internships/internship.model";
import { EmploymentRecord } from "../modules/employment-records/employment-record.model";
import { Survey } from "../modules/surveys/survey.model";
import { SurveyQuestion } from "../modules/survey-questions/survey-question.model";
import { SurveyInvitation } from "../modules/survey-invitations/survey-invitation.model";
import { SurveyAnswer } from "../modules/survey-answers/survey-answer.model";
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
}
