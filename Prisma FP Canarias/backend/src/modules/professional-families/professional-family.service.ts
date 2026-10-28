import { professionalFamily } from "./professional-family.model.js";
export class professionalFamilyService {
  static async findAll() {
    return professionalFamily.findAll({
      order: [["id", "ASC"]],
    });
  }
  static async findById(id: number) {
    return professionalFamily.findByPk(id);
  }
  static async create(data: {
    name: string;
    code: string;
    description?: string | null;
  }) {
    return professionalFamily.create(data);
  }
  static async update(
    professionalFamily: professionalFamily,
    data: {
      name?: string;
      code?: string;
      description?: string | null;
    }
  ) {
    return professionalFamily.update(data);
  }
  static async delete(professionalFamily: professionalFamily) {
    await professionalFamily.destroy();
  }
}