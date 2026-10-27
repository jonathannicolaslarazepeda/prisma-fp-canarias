import { Request, Response, NextFunction } from "express";
import { SkillService } from "./skill.service";

export class SkillController {

  static async getAll(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const skills = await SkillService.findAll();

      res.json(skills);
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

      const skill = await SkillService.findById(id);

      if (!skill) {
        res.status(404).json({
          message: "Competencia no encontrada",
        });

        return;
      }

      res.json(skill);

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
      const { name, category, description } = req.body;

      if (!name || !category) {
        res.status(400).json({
          message: "name y category son obligatorios",
        });

        return;
      }

      const skill = await SkillService.create({
        name,
        category,
        description,
      });

      res.status(201).json(skill);

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

      const skill = await SkillService.findById(id);

      if (!skill) {
        res.status(404).json({
          message: "Competencia no encontrada",
        });

        return;
      }

      const updatedSkill = await SkillService.update(
        skill,
        req.body
      );

      res.json(updatedSkill);

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

      const skill = await SkillService.findById(id);

      if (!skill) {
        res.status(404).json({
          message: "Competencia no encontrada",
        });

        return;
      }

      await SkillService.delete(skill);

      res.status(204).send();

    } catch (error) {
      next(error);
    }
  }
}
