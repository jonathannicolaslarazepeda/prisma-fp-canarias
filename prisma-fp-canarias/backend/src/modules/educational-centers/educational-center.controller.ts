import { Request, Response, NextFunction } from "express";
import { educationalCenterService} from "./educational-center.service.js";

export class educationalCenterController {

  static async getAll(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const educationalCenter = await educationalCenterService.findAll();

      res.json(educationalCenter);
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

      const educationalCenter = await educationalCenterService.findById(id);

      if (!educationalCenter) {
        res.status(404).json({
          message: "educative Center not found",
        });

        return;
      }

      res.json(educationalCenter);

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
      const { name, code, logoUrl, address, isActive } = req.body;

      if (!name || !code) {
        res.status(400).json({
          message: "Name and code is required",
        });

        return;
      }

      const educationalCenter = await educationalCenterService.create({
        name,
        code,
        logoUrl,
        address,
        isActive
      });

      res.status(201).json(educationalCenter);

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

      const educationalCenter = await educationalCenterService.findById(id);

      if (!educationalCenter) {
        res.status(404).json({
          message: "Educational Center not found",
        });

        return;
      }

      const updatedEducationalCenter = await educationalCenterService.update(
        educationalCenter,
        req.body
      );

      res.json(updatedEducationalCenter);

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

      const educationalCenter = await educationalCenterService.findById(id);

      if (!educationalCenter) {
        res.status(404).json({
          message: "Educational Center not found",
        });

        return;
      }

      await educationalCenterService.delete(educationalCenter);

      res.status(204).send();

    } catch (error) {
      next(error);
    }
  }
}
