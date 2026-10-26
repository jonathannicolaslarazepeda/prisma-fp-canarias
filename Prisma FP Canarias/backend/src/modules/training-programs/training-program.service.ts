import { trainingProgram } from "./training-program.model.js";

export class trainingProgramService {

  static async findAll() 
  {
    return trainingProgram.findAll({
      order: [["id", "ASC"]],
    });
  }
  static async findById(id: number) {
    return trainingProgram.findByPk(id);
  }

  static async create(data: {
    familyId: number;
    centerId: number;
    name: string;
    code: string;
    level: string;
    isActive?: boolean;
  }) {
    return trainingProgram.create(data);
  }

  static async update(
    trainingProgram: trainingProgram,
    data: {
      familyId?: number;
      centerId?: number;
      name?: string;
      code?: string;
      level?: string;
      isActive?: boolean;
    }
  ) {
    return trainingProgram.update(data);
  }
  
  static async delete(trainingProgram: trainingProgram) {
    await trainingProgram.destroy();
  }
}