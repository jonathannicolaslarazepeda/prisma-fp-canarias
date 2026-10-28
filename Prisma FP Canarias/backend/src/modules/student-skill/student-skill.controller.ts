import { Request, Response, NextFunction } from "express";
import { StudentSkillService } from "./student-skill.service.js";

export class StudentSkillController {

  static async getAll(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      
      const studentSkills = await StudentSkillService.findAll();

      res.json(studentSkills);
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
      
      const studentSkills = await StudentSkillService.findAllEagerly();

      res.json(studentSkills);
    } catch (error) {
      next(error);
    }
  }

  static async getByStudentId(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const studentId = Number(req.params.studentId);

      const studentSkills = await StudentSkillService.findByStudentId(studentId);

      res.json(studentSkills);
    } catch (error) {
      next(error);
    }
  }

  static async getByIds(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const studentId = Number(req.params.studentId);
      const skillId = Number(req.params.skillId);


      const studentSkill = await StudentSkillService.findByIds(studentId, skillId);

      if (!studentSkill) {
        res.status(404).json({
          message: "Student skill not found.",
        });

        return;
      }

      res.json(studentSkill);

    } catch (error) {
      next(error);
    }
  }

  static async getEagerlyByIds(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const studentId = Number(req.params.studentId);
      const skillId = Number(req.params.skillId);


      const studentSkill = await StudentSkillService.findEagerlyByIds(studentId, skillId);

      if (!studentSkill) {
        res.status(404).json({
          message: "Student skill not found.",
        });

        return;
      }

      res.json(studentSkill);

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
      const { studentId, skillId, proficiencyLevel } = req.body;

      if (!studentId || !skillId || !proficiencyLevel) {
        res.status(400).json({
          message: "studentId, skillId and proficiencyLevel are required fields.",
        });

        return;
      }

      const studentSkill = await StudentSkillService.create({
        studentId,
        skillId,
        proficiencyLevel,
      });

      res.status(201).json(studentSkill);

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
      const studentId = Number(req.params.studentId);
      const skillId = Number(req.params.skillId);


      const studentSkill = await StudentSkillService.findByIds(studentId, skillId);

      if (!studentSkill) {
        res.status(404).json({
          message: "Student skill not found.",
        });

        return;
      }

      const updatedStudentSkill = await StudentSkillService.update(
        studentSkill,
        req.body
      );

      res.json(updatedStudentSkill);

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
      const studentId = Number(req.params.studentId);
      const skillId = Number(req.params.skillId);


      const studentSkill = await StudentSkillService.findByIds(studentId, skillId);

      if (!studentSkill) {
        res.status(404).json({
          message: "Student skill not found.",
        });

        return;
      }

      await StudentSkillService.delete(studentSkill);

      res.status(204).send();

    } catch (error) {
      next(error);
    }
  }
}
