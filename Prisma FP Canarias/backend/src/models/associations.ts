import { Student } from "../modules/student/student.model";
import { Skill } from "../modules/skill/skill.model";
import { StudentSkill } from "../modules/student-skill/student-skill.model";
import { StudentInterest } from "../modules/student-interest/student-interest.model";
import { Consent } from "../modules/consent/consent.model";
import { ConsentRequest } from "../modules/consent-request/consent-request.model";

export function defineAssociations() {
    Student.hasMany(StudentSkill, { foreignKey: "studentId", as: "studentSkills" });
    StudentSkill.belongsTo(Student, { foreignKey: "studentId", as: "student" });

    Skill.hasMany(StudentSkill, { foreignKey: "skillId", as: "studentSkills" });
    StudentSkill.belongsTo(Skill, { foreignKey: "skillId", as: "skill" });

    Student.belongsToMany(Skill, {
        through: StudentSkill, foreignKey: "studentId", otherKey: "skillId", as: "skills"
    });
    Skill.belongsToMany(Student, {
        through: StudentSkill, foreignKey: "skillId", otherKey: "studentId", as: "students"
    });

    Student.hasMany(StudentInterest, { foreignKey: "studentId", as: "interests" });
    StudentInterest.belongsTo(Student, { foreignKey: "studentId", as: "student" });

    Student.hasMany(Consent, { foreignKey: "studentId", as: "consents" });
    Consent.belongsTo(Student, { foreignKey: "studentId", as: "student" });

    Student.hasMany(ConsentRequest, { foreignKey: "studentId", as: "consentRequests" });
    ConsentRequest.belongsTo(Student, { foreignKey: "studentId", as: "student" });

    ConsentRequest.hasMany(Consent, { foreignKey: "consentRequestId", as: "consents" });
    Consent.belongsTo(ConsentRequest, { foreignKey: "consentRequestId", as: "consentRequest" });
}