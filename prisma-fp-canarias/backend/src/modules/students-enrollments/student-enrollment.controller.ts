import { Request, Response, NextFunction } from "express";
import { studentEnrollmentService } from "./student-enrollment.service.js";

export class studentEnrollmentController {

  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const records = await studentEnrollmentService.findAll();
      res.json(records);
    } catch (error) {
      next(error);
    }
  }

  static async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const record = await studentEnrollmentService.findById(id);
      if (!record) {
        res.status(404).json({ message: "StudentEnrollment not found" });
        return;
      }
      res.json(record);
    } catch (error) {
      next(error);
    }
  }

  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { studentId, programId, academicYearId, enrollmentDate, graduationDate,
        status } = req.body;
      if (!studentId || !programId || !academicYearId || !enrollmentDate || !status) {
        res.status(400).json({ message: "Required fields are missing" });
        return;
      }
      const record = await studentEnrollmentService.create({
        studentId,
        programId,
        academicYearId,
        enrollmentDate,
        graduationDate,
        status,
      });
      res.status(201).json(record);
    } catch (error) {
      next(error);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const record = await studentEnrollmentService.findById(id);
      if (!record) {
        res.status(404).json({ message: "StudentEnrollment not found" });
        return;
      }
      const updatedRecord = await studentEnrollmentService.update(record, req.body);
      res.json(updatedRecord);
    } catch (error) {
      next(error);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {

    try {
      const id = Number(req.params.id);
      const record = await studentEnrollmentService.findById(id);
      if (!record) {
        res.status(404).json({ message: "StudentEnrollment not found" });
        return;
      }
      await studentEnrollmentService.delete(record);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}