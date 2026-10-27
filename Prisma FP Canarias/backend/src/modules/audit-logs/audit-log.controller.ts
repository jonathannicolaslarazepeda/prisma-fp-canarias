import { Request, Response, NextFunction } from "express";
import { AuditLogService } from "./audit-log.service.js";

export class AuditLogController {

  static async getAll(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const auditLogs = await AuditLogService.findAll();

      res.json(auditLogs);
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

      const auditLog = await AuditLogService.findById(id);

      if (!auditLog) {
        res.status(404).json({
          message: "Audit log not found",
        });

        return;
      }

      res.json(auditLog);

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
      const { userId, action, entityType, entityId, previousValues, newValues } = req.body;

      if (!userId || !action || !entityType || !entityId) {
        res.status(400).json({
          message: "userId, action, entityType, and entityId are required",
        });

        return;
      }

      const auditLog = await AuditLogService.create({
        userId,
        action,
        entityType,
        entityId,
        previousValues,
        newValues,
      });

      res.status(201).json(auditLog);

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

      const auditLog = await AuditLogService.findById(id);

      if (!auditLog) {
        res.status(404).json({
          message: "Audit log not found",
        });

        return;
      }

      const updatedAuditLog = await AuditLogService.update(
        auditLog,
        req.body
      );

      res.json(updatedAuditLog);

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

      const auditLog = await AuditLogService.findById(id);

      if (!auditLog) {
        res.status(404).json({
          message: "Audit log not found",
        });

        return;
      }

      await AuditLogService.delete(auditLog);

      res.status(204).send();

    } catch (error) {
      next(error);
    }
  }
}