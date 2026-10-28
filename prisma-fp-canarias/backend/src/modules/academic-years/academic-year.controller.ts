
import { Request, Response, NextFunction } from "express";
import { academicYearService } from "./academic-year.service.js";

export class academicYearController {

  static async getAll(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const academicYears = await academicYearService.findAll();

      res.json(academicYears);
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

      const academicYear = await academicYearService.findById(id);

      if (!academicYear) {
        res.status(404).json({
          message: "Academic Year not found",
        });

        return;
      }

      res.json(academicYear);

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
      const { name, startDate, endDate, isActive } = req.body;

      if (!name || !startDate || !endDate) {
        res.status(400).json({
          message: "Name, startDate and endDate are required",
        });

        return;
      }

      const academicYear = await academicYearService.create({
        name,
        startDate,
        endDate,
        isActive
      });

      res.status(201).json(academicYear);

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

      const academicYear = await academicYearService.findById(id);

      if (!academicYear) {
        res.status(404).json({
          message: "Academic Year not found",
        });

        return;
      }

      const updatedAcademicYear = await academicYearService.update(
        academicYear,
        req.body
      );

      res.json(updatedAcademicYear);

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

      const academicYear = await academicYearService.findById(id);

      if (!academicYear) {
        res.status(404).json({
          message: "Academic Year not found",
        });

        return;
      }

      await academicYearService.delete(academicYear);

      res.status(204).send();

    } catch (error) {
      next(error);
    }
  }
}
