import { Request, Response, NextFunction } from "express";
import { StudentService } from "./student.service";

export class StudentController {

  static async getStudentWithSkillsSearchByName(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const nameSearch = String(req.params.name_search);
      const students = await StudentService.findStudentWithSkillsSearchByName(nameSearch);

      res.json(students);
    } catch (error) {
      next(error);
    }
  }

  static async getAll(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const students = await StudentService.findAll();

      res.json(students);
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

      const student = await StudentService.findById(id);

      if (!student) {
        res.status(404).json({
          message: "Student not found",
        });

        return;
      }

      res.json(student);

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
      const { userId, nationalId, firstName, lastName, email, phone, birthDate } = req.body;

      if (!userId || !nationalId || !firstName || !lastName || !email) {
        res.status(400).json({
          message: "userId, nationalId, firstName, lastName and email are required fields.",
        });

        return;
      }

      const student = await StudentService.create({
        userId,
        nationalId,
        firstName,
        lastName,
        email,
        phone,
        birthDate,
      });

      res.status(201).json(student);

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

      const student = await StudentService.findById(id);

      if (!student) {
        res.status(404).json({
          message: "Student not found",
        });

        return;
      }

      const updatedStudent = await StudentService.update(
        student,
        req.body
      );

      res.json(updatedStudent);

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

      const student = await StudentService.findById(id);

      if (!student) {
        res.status(404).json({
          message: "Student not found",
        });

        return;
      }

      await StudentService.delete(student);

      res.status(204).send();

    } catch (error) {
      next(error);
    }
  }
}
