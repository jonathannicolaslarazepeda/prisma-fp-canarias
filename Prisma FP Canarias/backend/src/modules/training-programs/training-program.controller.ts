import { Request, Response, NextFunction } from "express";
import { trainingProgramService } from "./training-program.service.js";

export class trainingProgramController {

  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const records = await trainingProgramService.findAll();
      res.json(records);
    } catch (error) {
      next(error);
    }
  }

  static async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const record = await trainingProgramService.findById(id);
      if (!record) {
        res.status(404).json({ message: "TrainingProgram not found" });
        return;
      }
      res.json(record);
    } catch (error) {
      next(error);
    }
  }

  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { familyId, centerId, name, code, level, isActive } = req.body;
      if (!familyId || !centerId || !name || !code || !level) {
        res.status(400).json({ message: "Required fields are missing" });
        return;
      }
      const record = await trainingProgramService.create({
        familyId,
        centerId,
        name,
        code,
        level,
        isActive,
      });
      res.status(201).json(record);
    } catch (error) {
      next(error);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const record = await trainingProgramService.findById(id);
      if (!record) {
        res.status(404).json({ message: "TrainingProgram not found" });
        return;
      }
      const updatedRecord = await trainingProgramService.update(record, req.body);
      res.json(updatedRecord);
    } catch (error) {
      next(error);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    try {

      const id = Number(req.params.id);
      const record = await trainingProgramService.findById(id);
      if (!record) {
        res.status(404).json({ message: "TrainingProgram not found" });
        return;
      }
      await trainingProgramService.delete(record);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}