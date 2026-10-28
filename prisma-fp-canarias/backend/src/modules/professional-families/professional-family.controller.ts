import { Request, Response, NextFunction } from "express";
import { professionalFamilyService } from "./professional-family.service.js";

export class professionalFamilyController {
  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const records = await professionalFamilyService.findAll();
      res.json(records);
    } catch (error) {
      next(error);
    }
  }
  static async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const record = await professionalFamilyService.findById(id);
      if (!record) {
        res.status(404).json({ message: "ProfessionalFamily not found" });
        return;
      }
      res.json(record);
    } catch (error) {
      next(error);
    }
  }
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, code, description } = req.body;
      if (!name || !code) {
        res.status(400).json({ message: "Required fields are missing" });
        return;
      }
      const record = await professionalFamilyService.create({
        name,
        code,
        description,
      });
      res.status(201).json(record);
    } catch (error) {
      next(error);
    }
  }
  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const record = await professionalFamilyService.findById(id);
      if (!record) {
        res.status(404).json({ message: "ProfessionalFamily not found" });
        return;
      }
      const updatedRecord = await professionalFamilyService.update(record, req.body);
      res.json(updatedRecord);
    } catch (error) {
      next(error);
    }
  }
  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const record = await professionalFamilyService.findById(id);
      if (!record) {
        res.status(404).json({ message: "ProfessionalFamily not found" });
        return;
      }
      await professionalFamilyService.delete(record);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}