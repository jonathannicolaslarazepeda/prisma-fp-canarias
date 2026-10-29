import { Request, Response, NextFunction } from "express";
import { SurveyQuestionService } from "./survey-question.service";

export class SurveyQuestionController {

  static async getAll(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const surveyQuestions = await SurveyQuestionService.findAll();

      res.json(surveyQuestions);
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

      const surveyQuestion = await SurveyQuestionService.findById(id);

      if (!surveyQuestion) {
        res.status(404).json({
          message: "Pregunta no encontrada",
        });

        return;
      }

      res.json(surveyQuestion);

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
      const surveyQuestions = await SurveyQuestionService.findAllEagerly();

      res.json(surveyQuestions);
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

      const surveyQuestion = await SurveyQuestionService.findEagerlyById(id);

      if (!surveyQuestion) {
        res.status(404).json({
          message: "Pregunta no encontrada",
        });

        return;
      }

      res.json(surveyQuestion);

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
      const { surveyId, questionText, questionType, sortOrder, isRequired } = req.body;

      if (!surveyId || !questionText || !questionType || sortOrder === undefined) {
        res.status(400).json({
          message: "surveyId, questionText, questionType y sortOrder son obligatorios",
        });

        return;
      }

      const surveyQuestion = await SurveyQuestionService.create({
        surveyId,
        questionText,
        questionType,
        sortOrder,
        isRequired,
      });

      res.status(201).json(surveyQuestion);

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

      const surveyQuestion = await SurveyQuestionService.findById(id);

      if (!surveyQuestion) {
        res.status(404).json({
          message: "Pregunta no encontrada",
        });

        return;
      }

      const updatedSurveyQuestion = await SurveyQuestionService.update(
        surveyQuestion,
        req.body
      );

      res.json(updatedSurveyQuestion);

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

      const surveyQuestion = await SurveyQuestionService.findById(id);

      if (!surveyQuestion) {
        res.status(404).json({
          message: "Pregunta no encontrada",
        });

        return;
      }

      await SurveyQuestionService.delete(surveyQuestion);

      res.status(204).send();

    } catch (error) {
      next(error);
    }
  }
}
