
import { educationalCenter } from "../modules/educational-centers/educational-center.model.js";
import { academicYear } from "../modules/academic-years/academic-year.model.js";
import { professionalFamily } from "../modules/professional-families/professional-family.model.js";
import { trainingProgram } from "../modules/training-programs/training-program.model.js";
import { tutorAssignment } from "../modules/tutor-assignments/tutor-assignment.model.js";
import { studentEnrollment } from "../modules/students-enrollments/student-enrollment.model.js";

export function defineAssociations() {

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

}
