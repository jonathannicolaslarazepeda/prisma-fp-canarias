import { Request, Response, NextFunction } from "express";
import { SurveyService } from "./survey.service.js";

export class SurveyController {

  static async getAll(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const surveys = await SurveyService.findAll();

      res.json(surveys);
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

      const survey = await SurveyService.findById(id);

      if (!survey) {
        res.status(404).json({
          message: "Encuesta no encontrada",
        });

        return;
      }

      res.json(survey);

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
      const surveys = await SurveyService.findAllEagerly();

      res.json(surveys);
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

      const survey = await SurveyService.findEagerlyById(id);

      if (!survey) {
        res.status(404).json({
          message: "Encuesta no encontrada",
        });

        return;
      }

      res.json(survey);

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
      const { title, description, isActive } = req.body;

      if (!title) {
        res.status(400).json({
          message: "title es obligatorio",
        });

        return;
      }

      const survey = await SurveyService.create({
        title,
        description,
        isActive,
      });

      res.status(201).json(survey);

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

      const survey = await SurveyService.findById(id);

      if (!survey) {
        res.status(404).json({
          message: "Encuesta no encontrada",
        });

        return;
      }

      const updatedSurvey = await SurveyService.update(
        survey,
        req.body
      );

      res.json(updatedSurvey);

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

      const survey = await SurveyService.findById(id);

      if (!survey) {
        res.status(404).json({
          message: "Encuesta no encontrada",
        });

        return;
      }

      await SurveyService.delete(survey);

      res.status(204).send();

    } catch (error) {
      next(error);
    }
  }
}
