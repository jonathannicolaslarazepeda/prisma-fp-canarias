import { Skill } from "./skill.model";

export class SkillService {

  static async findAll() {
    return Skill.findAll({
      order: [["id", "ASC"]],
    });
  }


  static async findById(id: number) {
    return Skill.findByPk(id);
  }


  static async create(data: {
    name: string;
    category: string;
    description?: string | null;
  }) {
    return Skill.create(data);
  }


  static async update(
    skill: Skill,
    data: {
      name?: string;
      category?: string;
      description?: string | null;
    }
  ) {
    return skill.update(data);
  }


  static async delete(skill: Skill) {
    await skill.destroy();
  }
}
