import { Request, Response, NextFunction } from "express";
import { ConsentService } from "./consent.service.js";

export class ConsentController {

  static async getByStudentId(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const studentId = Number(req.params.id);
      const consents = await ConsentService.findByStudentId(studentId);

      res.json(consents);
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
      const consents = await ConsentService.findAll();

      res.json(consents);
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

      const consent = await ConsentService.findById(id);

      if (!consent) {
        res.status(404).json({
          message: "Consent not found",
        });

        return;
      }

      res.json(consent);

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
      const { studentId, consentRequestId, purpose, status, policyVersion, recordedAt } = req.body;

      if (!studentId || !purpose || !status || !policyVersion) {
        res.status(400).json({
          message: "studentId, purpose, status and policyVersion are required fields.",
        });

        return;
      }

      const consent = await ConsentService.create({
        studentId,
        consentRequestId,
        purpose,
        status,
        policyVersion,
        recordedAt,
      });

      res.status(201).json(consent);

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

      const consent = await ConsentService.findById(id);

      if (!consent) {
        res.status(404).json({
          message: "Consent not found",
        });

        return;
      }

      const updatedConsent = await ConsentService.update(
        consent,
        req.body
      );

      res.json(updatedConsent);

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

      const consent = await ConsentService.findById(id);

      if (!consent) {
        res.status(404).json({
          message: "Consent not found",
        });

        return;
      }

      await ConsentService.delete(consent);

      res.status(204).send();

    } catch (error) {
      next(error);
    }
  }
}
