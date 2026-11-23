
import { Request, Response, NextFunction } from "express";
import { examenFichaService } from "./examen-ficha.service.js";

export class examenFichaController {

  static async getAll(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const examenFicha = await examenFichaService.findAll();

      res.json(examenFicha);
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

      const examenFicha = await examenFichaService.findById(id);

      if (!examenFicha) {
        res.status(404).json({
          message: "Examen Ficha not found",
        });

        return;
      }

      res.json(examenFicha);

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
      const { educationalCenterId, description, operation } = req.body;

      if (!educationalCenterId || !description) {
        res.status(400).json({
          message: "Educational Center ID and description are required",
        });

        return;
      }

      const examenFicha = await examenFichaService.create({
        educationalCenterId,
        description,
        operation
      });

      res.status(201).json(examenFicha);

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

      const examenFicha = await examenFichaService.findById(id);

      if (!examenFicha) {
        res.status(404).json({
          message: "Examen Ficha not found",
        });

        return;
      }

      const update = await examenFichaService.update(
        examenFicha,
        req.body
      );

      res.json(update);

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

      const examenFicha = await examenFichaService.findById(id);

      if (!examenFicha) {
        res.status(404).json({
          message: "Examen Ficha not found",
        });

        return;
      }

      await examenFichaService.delete(examenFicha);

      res.status(204).send();

    } catch (error) {
      next(error);
    }
  }
}
