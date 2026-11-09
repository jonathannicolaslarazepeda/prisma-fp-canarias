import { Request, Response, NextFunction } from "express";
import { ConsentRequestService } from "./consent-request.service.js";

export class ConsentRequestController {

  static async getByStudentId(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const studentId = Number(req.params.id);
      const consentRequests = await ConsentRequestService.findByStudentId(studentId);

      res.json(consentRequests);
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
      const consentRequests = await ConsentRequestService.findAll();

      res.json(consentRequests);
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

      const consentRequest = await ConsentRequestService.findById(id);

      if (!consentRequest) {
        res.status(404).json({
          message: "Solicitud de consentimiento no encontrada",
        });

        return;
      }

      res.json(consentRequest);

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
      const { studentId, sentById, tokenHash, sentAt, expiresAt, usedAt } = req.body;

      if (!studentId || !sentById || !tokenHash || !expiresAt) {
        res.status(400).json({
          message: "studentId, sentById, tokenHash y expiresAt son obligatorios",
        });

        return;
      }

      const consentRequest = await ConsentRequestService.create({
        studentId,
        sentById,
        tokenHash,
        sentAt,
        expiresAt,
        usedAt,
      });

      res.status(201).json(consentRequest);

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

      const consentRequest = await ConsentRequestService.findById(id);

      if (!consentRequest) {
        res.status(404).json({
          message: "Solicitud de consentimiento no encontrada",
        });

        return;
      }

      const updatedConsentRequest = await ConsentRequestService.update(
        consentRequest,
        req.body
      );

      res.json(updatedConsentRequest);

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

      const consentRequest = await ConsentRequestService.findById(id);

      if (!consentRequest) {
        res.status(404).json({
          message: "Solicitud de consentimiento no encontrada",
        });

        return;
      }

      await ConsentRequestService.delete(consentRequest);

      res.status(204).send();

    } catch (error) {
      next(error);
    }
  }
}
