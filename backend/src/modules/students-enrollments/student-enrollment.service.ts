import { studentEnrollment } from "./student-enrollment.model.js";

export class studentEnrollmentService {
  
  static async findAll() {
    return studentEnrollment.findAll({
      order: [["id", "ASC"]],
    });
  }

  static async findById(id: number) {
    return studentEnrollment.findByPk(id);
  }

  static async create(data: {
    studentId: number;
    programId: number;
    academicYearId: number;
    enrollmentDate: Date;
    graduationDate?: Date | null;
    status: string;
  }) {
    return studentEnrollment.create(data);
  }

  static async update(
    studentEnrollment: studentEnrollment,
    data: {
      studentId?: number;
      programId?: number;
      academicYearId?: number;
      enrollmentDate?: Date;
      graduationDate?: Date | null;
      status?: string;
    }
  ) {
    return studentEnrollment.update(data);
  }

  static async delete(studentEnrollment: studentEnrollment) {
    await studentEnrollment.destroy();
  }
}