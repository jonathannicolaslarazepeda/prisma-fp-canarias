
import { Request, Response, NextFunction } from "express";
import { examenAuditService } from "./examen-audit.service.js";

export class examenAuditController {

  static async getAll(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const examenAudits = await examenAuditService.findAll();

      res.json(examenAudits);
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

      const examenAudit = await examenAuditService.findById(id);

      if (!examenAudit) {
        res.status(404).json({
          message: "Examen Audit not found",
        });

        return;
      }

      res.json(examenAudit);

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
      const { educationalCenterId, description, operation } = req.body;

      if (!educationalCenterId || !description) {
        res.status(400).json({
          message: "Educational Center ID and description are required",
        });

        return;
      }

      const examenAudit = await examenAuditService.create({
        educationalCenterId,
        description,
        operation
      });

      res.status(201).json(examenAudit);

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

      const examenAudit = await examenAuditService.findById(id);

      if (!examenAudit) {
        res.status(404).json({
          message: "Examen Audit not found",
        });

        return;
      }

      const updatedExamenAudit = await examenAuditService.update(
        examenAudit,
        req.body
      );

      res.json(updatedExamenAudit);

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

      const examenAudit = await examenAuditService.findById(id);

      if (!examenAudit) {
        res.status(404).json({
          message: "Examen Audit not found",
        });

        return;
      }

      await examenAuditService.delete(examenAudit);

      res.status(204).send();

    } catch (error) {
      next(error);
    }
  }


  static async getByOperationCreate(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const examenAudits = await examenAuditService.findByOperationCreate();

      res.json(examenAudits);

    } catch (error) {
      next(error);
    }
  }
}
