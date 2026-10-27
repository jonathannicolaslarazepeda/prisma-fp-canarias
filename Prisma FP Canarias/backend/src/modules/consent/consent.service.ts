import { Consent } from "./consent.model";
import { Student } from "../student/student.model";

const includeStudent = {
  model: Student,
  as: "student",
  attributes: ["id", "firstName", "lastName", "email"],
};

export class ConsentService {

  static async findAll() {
    return Consent.findAll({
      order: [["id", "ASC"]],
    });
  }


  static async findById(id: number) {
    return Consent.findByPk(id);
  }


  static async findByStudentId(studentId: number) {
    return Consent.findAll({
      where: { studentId },
      include: [includeStudent],
      order: [["id", "DESC"]],
    });
  }

  static async create(data: {
    studentId: number;
    consentRequestId?: number | null;
    purpose: string;
    status: string;
    policyVersion: string;
    recordedAt?: Date;
  }) {
    return Consent.create(data);
  }


  static async update(
    consent: Consent,
    data: {
      studentId?: number;
      consentRequestId?: number | null;
      purpose?: string;
      status?: string;
      policyVersion?: string;
      recordedAt?: Date;
    }
  ) {
    return consent.update(data);
  }


  static async delete(consent: Consent) {
    await consent.destroy();
  }
}
