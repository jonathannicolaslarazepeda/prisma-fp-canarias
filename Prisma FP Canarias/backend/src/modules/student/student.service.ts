import { Student } from "./student.model";
import { StudentSkill } from "../student-skill/student-skill.model";
import { Op } from "sequelize";

export class StudentService {

  static async findAll() {
    return Student.findAll({
      order: [["id", "ASC"]],
    });
  }


  static async findById(id: number) {
    return Student.findByPk(id);
  }


  static async findStudentWithSkillsSearchByName(nameSearch: string) {
    return Student.findAll({
      where: {
        [Op.or]: [
          { firstName: { [Op.like]: `%${nameSearch}%` } },
          { lastName: { [Op.like]: `%${nameSearch}%` } },
        ],
      },
      include: [
        {
          model: StudentSkill,
          as: "studentSkills",
          required: true,
        },
      ],
    });
  }

  static async create(data: {
    userId: number;
    nationalId: string;
    firstName: string;
    lastName: string;
    email: string;
    phone?: string | null;
    birthDate?: Date | null;
  }) {
    return Student.create(data);
  }


  static async update(
    student: Student,
    data: {
      userId?: number;
      nationalId?: string;
      firstName?: string;
      lastName?: string;
      email?: string;
      phone?: string | null;
      birthDate?: Date | null;
    }
  ) {
    return student.update(data);
  }


  static async delete(student: Student) {
    await student.destroy();
  }
}
