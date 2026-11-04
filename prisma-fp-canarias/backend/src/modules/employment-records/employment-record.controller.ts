import { Request, Response, NextFunction } from "express";
import { EmploymentRecordService } from "./employment-record.service.js";

export class EmploymentRecordController {

  static async getAll(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const employmentRecords = await EmploymentRecordService.findAll();

      res.json(employmentRecords);
    } catch (error) {
      next(error);
    }
  }

  static async getById(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const id = Number(req.params.id);

      const employmentRecord = await EmploymentRecordService.findById(id);

      if (!employmentRecord) {
        res.status(404).json({
          message: "Registro de empleo no encontrado",
        });

        return;
      }

      res.json(employmentRecord);

    } catch (error) {
      next(error);
    }
  }

  static async getAllEagerly(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const employmentRecords = await EmploymentRecordService.findAllEagerly();

      res.json(employmentRecords);
    } catch (error) {
      next(error);
    }
  }

  static async getEagerlyById(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const id = Number(req.params.id);

      const employmentRecord = await EmploymentRecordService.findEagerlyById(id);

      if (!employmentRecord) {
        res.status(404).json({
          message: "Registro de empleo no encontrado",
        });

        return;
      }

      res.json(employmentRecord);

    } catch (error) {
      next(error);
    }
  }

  static async create(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { studentId, companyId, internshipId, position, sector, startDate, endDate, isRelatedToStudies } = req.body;

      if (!studentId || !companyId || !position || !startDate) {
        res.status(400).json({
          message: "studentId, companyId, position y startDate son obligatorios",
        });

        return;
      }

      const employmentRecord = await EmploymentRecordService.create({
        studentId,
        companyId,
        internshipId,
        position,
        sector,
        startDate,
        endDate,
        isRelatedToStudies,
      });

      res.status(201).json(employmentRecord);

    } catch (error) {
      next(error);
    }
  }


  static async update(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const id = Number(req.params.id);

      const employmentRecord = await EmploymentRecordService.findById(id);

      if (!employmentRecord) {
        res.status(404).json({
          message: "Registro de empleo no encontrado",
        });

        return;
      }

      const updatedEmploymentRecord = await EmploymentRecordService.update(
        employmentRecord,
        req.body
      );

      res.json(updatedEmploymentRecord);

    } catch (error) {
      next(error);
    }
  }


  static async delete(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const id = Number(req.params.id);

      const employmentRecord = await EmploymentRecordService.findById(id);

      if (!employmentRecord) {
        res.status(404).json({
          message: "Registro de empleo no encontrado",
        });

        return;
      }

      await EmploymentRecordService.delete(employmentRecord);

      res.status(204).send();

    } catch (error) {
      next(error);
    }
  }
}
