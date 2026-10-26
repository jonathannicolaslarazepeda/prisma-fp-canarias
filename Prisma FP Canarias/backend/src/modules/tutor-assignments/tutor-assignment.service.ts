import { tutorAssignment } from "./tutor-assignment.model.js";

export class tutorAssignmentService {

  static async findAll() {
    return tutorAssignment.findAll({
      order: [["id", "ASC"]],
    });
  }

  static async findById(id: number) {
    return tutorAssignment.findByPk(id);
  }

  static async create(data: {
    tutorId: number;
    programId: number;
    academicYearId: number;
    assignedAt?: Date;
  }) {
    return tutorAssignment.create(data);
  }

  static async update(
    tutorAssignment: tutorAssignment,
    data: {
      tutorId?: number;
      programId?: number;
      academicYearId?: number;
      assignedAt?: Date;
    }
  ) {
    return tutorAssignment.update(data);
  }

  static async delete(tutorAssignment: tutorAssignment) {
    await tutorAssignment.destroy();
  }
}