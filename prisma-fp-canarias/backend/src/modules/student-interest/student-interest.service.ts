import { StudentInterest } from "./student-interest.model.js";
import { Student } from "../student/student.model.js";

const includeStudent = {
  model: Student,
  as: "student",
  attributes: ["id", "firstName", "lastName", "email"],
};

export class StudentInterestService {

  static async findAll() {
    return StudentInterest.findAll({
      order: [["id", "ASC"]],
    });
  }


  static async findById(id: number) {
    return StudentInterest.findByPk(id);
  }


  static async findByStudentId(studentId: number) {
    return StudentInterest.findAll({
      where: { studentId },
      include: [includeStudent],
      order: [["id", "DESC"]],
    });
  }

  static async create(data: {
    studentId: number;
    name: string;
    description?: string | null;
  }) {
    return StudentInterest.create(data);
  }


  static async update(
    studentInterest: StudentInterest,
    data: {
      studentId?: number;
      name?: string;
      description?: string | null;
    }
  ) {
    return studentInterest.update(data);
  }


  static async delete(studentInterest: StudentInterest) {
    await studentInterest.destroy();
  }
}
