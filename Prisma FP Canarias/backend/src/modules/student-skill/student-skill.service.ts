import { StudentSkill } from "./student-skill.model";
import { Student } from "../student/student.model";
import { Skill } from "../skill/skill.model";

const includeStudent = {
  model: Student,
  as: "student",
  attributes: ["id", "firstName", "lastName", "email"],
};

const includeSkill = {
  model: Skill,
  as: "skill",
  attributes: ["id", "name", "category"],
};

export class StudentSkillService {

  static async findAll() {
    return StudentSkill.findAll({
      order: [["studentId", "ASC"], ["skillId", "ASC"]],
    });
  }


  static async findByIds(studentId: number, skillId: number) {
    return StudentSkill.findOne({
      where: { studentId, skillId },
    });
  }

  static async findByStudentId(studentId: number) {
    return StudentSkill.findAll({
      where: { studentId },
      include: [includeSkill],
      order: [["skillId", "ASC"]],
    });
  }

  static async findAllEagerly() {
    return StudentSkill.findAll({
      include: [includeStudent, includeSkill],
      order: [["studentId", "ASC"], ["skillId", "ASC"]],
    });
  }

  static async findEagerlyByIds(studentId: number, skillId: number) {
    return StudentSkill.findOne({
      where: { studentId, skillId },
      include: [includeStudent, includeSkill],
    });
  }

  static async create(data: {
    studentId: number;
    skillId: number;
    proficiencyLevel: string;
  }) {
    return StudentSkill.create(data);
  }


  static async update(
    studentSkill: StudentSkill,
    data: {
      proficiencyLevel?: string;
    }
  ) {
    return studentSkill.update(data);
  }


  static async delete(studentSkill: StudentSkill) {
    await studentSkill.destroy();
  }
}
