import { ConsentRequest } from "./consent-request.model.js";
import { Student } from "../student/student.model.js";

const includeStudent = {
  model: Student,
  as: "student",
  attributes: ["id", "firstName", "lastName", "email"],
};

export class ConsentRequestService {

  static async findAll() {
    return ConsentRequest.findAll({
      order: [["id", "ASC"]],
    });
  }


  static async findById(id: number) {
    return ConsentRequest.findByPk(id);
  }


  static async findByStudentId(studentId: number) {
    return ConsentRequest.findAll({
      where: { studentId },
      include: [includeStudent],
      order: [["id", "DESC"]],
    });
  }

  static async create(data: {
    studentId: number;
    sentById: number;
    tokenHash: string;
    sentAt?: Date;
    expiresAt: Date;
    usedAt?: Date | null;
  }) {
    return ConsentRequest.create(data);
  }


  static async update(
    consentRequest: ConsentRequest,
    data: {
      studentId?: number;
      sentById?: number;
      tokenHash?: string;
      sentAt?: Date;
      expiresAt?: Date;
      usedAt?: Date | null;
    }
  ) {
    return consentRequest.update(data);
  }


  static async delete(consentRequest: ConsentRequest) {
    await consentRequest.destroy();
  }
}
