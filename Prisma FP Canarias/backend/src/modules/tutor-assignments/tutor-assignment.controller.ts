import { Request, Response, NextFunction } from "express";
import { tutorAssignmentService } from "./tutor-assignment.service.js";

export class tutorAssignmentController {

  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const records = await tutorAssignmentService.findAll();
      res.json(records);
    } catch (error) {
      next(error);
    }
  }

  static async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const record = await tutorAssignmentService.findById(id);
      if (!record) {
        res.status(404).json({ message: "TutorAssignment not found" });
        return;
      }
      res.json(record);
    } catch (error) {
      next(error);
    }
  }

  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { tutorId, programId, academicYearId, assignedAt } = req.body;
      if (!tutorId || !programId || !academicYearId) {
        res.status(400).json({ message: "Required fields are missing" });
        return;
      }
      const record = await tutorAssignmentService.create({
        tutorId,
        programId,
        academicYearId,
        assignedAt,
      });
      res.status(201).json(record);
    } catch (error) {
      next(error);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {

    try {
      const id = Number(req.params.id);
      const record = await tutorAssignmentService.findById(id);
      if (!record) {
        res.status(404).json({ message: "TutorAssignment not found" });
        return;
      }
      const updatedRecord = await tutorAssignmentService.update(record, req.body);
      res.json(updatedRecord);
    } catch (error) {
      next(error);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const record = await tutorAssignmentService.findById(id);
      if (!record) {
        res.status(404).json({ message: "TutorAssignment not found" });
        return;
      }
      await tutorAssignmentService.delete(record);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}