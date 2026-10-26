import { Request, Response, NextFunction } from "express";
import { SurveyInvitationService } from "./survey-invitation.service";

export class SurveyInvitationController {

  static async getAll(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const surveyInvitations = await SurveyInvitationService.findAll();

      res.json(surveyInvitations);
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

      const surveyInvitation = await SurveyInvitationService.findById(id);

      if (!surveyInvitation) {
        res.status(404).json({
          message: "Invitación no encontrada",
        });

        return;
      }

      res.json(surveyInvitation);

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
      const surveyInvitations = await SurveyInvitationService.findAllEagerly();

      res.json(surveyInvitations);
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

      const surveyInvitation = await SurveyInvitationService.findEagerlyById(id);

      if (!surveyInvitation) {
        res.status(404).json({
          message: "Invitación no encontrada",
        });

        return;
      }

      res.json(surveyInvitation);

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
      const { surveyId, studentId, tokenHash, sentAt, expiresAt, completedAt } = req.body;

      if (!surveyId || !studentId || !tokenHash || !expiresAt) {
        res.status(400).json({
          message: "surveyId, studentId, tokenHash y expiresAt son obligatorios",
        });

        return;
      }

      const surveyInvitation = await SurveyInvitationService.create({
        surveyId,
        studentId,
        tokenHash,
        sentAt,
        expiresAt,
        completedAt,
      });

      res.status(201).json(surveyInvitation);

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

      const surveyInvitation = await SurveyInvitationService.findById(id);

      if (!surveyInvitation) {
        res.status(404).json({
          message: "Invitación no encontrada",
        });

        return;
      }

      const updatedSurveyInvitation = await SurveyInvitationService.update(
        surveyInvitation,
        req.body
      );

      res.json(updatedSurveyInvitation);

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

      const surveyInvitation = await SurveyInvitationService.findById(id);

      if (!surveyInvitation) {
        res.status(404).json({
          message: "Invitación no encontrada",
        });

        return;
      }

      await SurveyInvitationService.delete(surveyInvitation);

      res.status(204).send();

    } catch (error) {
      next(error);
    }
  }
}
