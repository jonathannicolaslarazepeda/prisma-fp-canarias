import { Request, Response, NextFunction } from "express";
import { InternshipService } from "./internship.service";

export class InternshipController {

  static async getAll(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const internships = await InternshipService.findAll();

      res.json(internships);
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

      const internship = await InternshipService.findById(id);

      if (!internship) {
        res.status(404).json({
          message: "Prácticas no encontradas",
        });

        return;
      }

      res.json(internship);

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
      const internships = await InternshipService.findAllEagerly();

      res.json(internships);
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

      const internship = await InternshipService.findEagerlyById(id);

      if (!internship) {
        res.status(404).json({
          message: "Prácticas no encontradas",
        });

        return;
      }

      res.json(internship);

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
      const { enrollmentId, companyId, startDate, endDate, wasHired, hiringDate } = req.body;

      if (!enrollmentId || !companyId || !startDate) {
        res.status(400).json({
          message: "enrollmentId, companyId y startDate son obligatorios",
        });

        return;
      }

      const internship = await InternshipService.create({
        enrollmentId,
        companyId,
        startDate,
        endDate,
        wasHired,
        hiringDate,
      });

      res.status(201).json(internship);

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

      const internship = await InternshipService.findById(id);

      if (!internship) {
        res.status(404).json({
          message: "Prácticas no encontradas",
        });

        return;
      }

      const updatedInternship = await InternshipService.update(
        internship,
        req.body
      );

      res.json(updatedInternship);

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

      const internship = await InternshipService.findById(id);

      if (!internship) {
        res.status(404).json({
          message: "Prácticas no encontradas",
        });

        return;
      }

      await InternshipService.delete(internship);

      res.status(204).send();

    } catch (error) {
      next(error);
    }
  }
}
