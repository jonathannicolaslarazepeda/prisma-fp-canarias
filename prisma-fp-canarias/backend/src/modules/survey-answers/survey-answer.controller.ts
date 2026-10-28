import { Request, Response, NextFunction } from "express";
import { SurveyAnswerService } from "./survey-answer.service";

export class SurveyAnswerController {

  static async getAll(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const surveyAnswers = await SurveyAnswerService.findAll();

      res.json(surveyAnswers);
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

      const surveyAnswer = await SurveyAnswerService.findById(id);

      if (!surveyAnswer) {
        res.status(404).json({
          message: "Respuesta no encontrada",
        });

        return;
      }

      res.json(surveyAnswer);

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
      const surveyAnswers = await SurveyAnswerService.findAllEagerly();

      res.json(surveyAnswers);
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

      const surveyAnswer = await SurveyAnswerService.findEagerlyById(id);

      if (!surveyAnswer) {
        res.status(404).json({
          message: "Respuesta no encontrada",
        });

        return;
      }

      res.json(surveyAnswer);

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
      const { invitationId, questionId, answerValue, answeredAt } = req.body;

      if (!invitationId || !questionId || !answerValue) {
        res.status(400).json({
          message: "invitationId, questionId y answerValue son obligatorios",
        });

        return;
      }

      const surveyAnswer = await SurveyAnswerService.create({
        invitationId,
        questionId,
        answerValue,
        answeredAt,
      });

      res.status(201).json(surveyAnswer);

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

      const surveyAnswer = await SurveyAnswerService.findById(id);

      if (!surveyAnswer) {
        res.status(404).json({
          message: "Respuesta no encontrada",
        });

        return;
      }

      const updatedSurveyAnswer = await SurveyAnswerService.update(
        surveyAnswer,
        req.body
      );

      res.json(updatedSurveyAnswer);

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

      const surveyAnswer = await SurveyAnswerService.findById(id);

      if (!surveyAnswer) {
        res.status(404).json({
          message: "Respuesta no encontrada",
        });

        return;
      }

      await SurveyAnswerService.delete(surveyAnswer);

      res.status(204).send();

    } catch (error) {
      next(error);
    }
  }
}
