import { Request, Response, NextFunction } from "express";
import { RolePermissionService } from "./role-permission.service.js";

export class RolePermissionController {

  static async getAll(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const rolePermissions = await RolePermissionService.findAll();

      res.json(rolePermissions);
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

      const rolePermission = await RolePermissionService.findById(id);

      if (!rolePermission) {
        res.status(404).json({
          message: "Role Permission not found",
        });

        return;
      }

      res.json(rolePermission);

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
      const { name, description } = req.body;

      if (!name || !description) {
        res.status(400).json({
          message: "name and description are required",
        });

        return;
      }

      const rolePermission = await RolePermissionService.create({
       roleId: req.body.roleId,
       permissionId: req.body.permissionId
      });

      res.status(201).json(rolePermission);

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

      const rolePermission = await RolePermissionService.findById(id);

      if (!rolePermission) {
        res.status(404).json({
          message: "Role Permission not found",
        });

        return;
      }

      const updatedRolePermission = await RolePermissionService.update(
        rolePermission,
        req.body
      );

      res.json(updatedRolePermission);

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

      const rolePermission = await RolePermissionService.findById(id);

      if (!rolePermission) {
        res.status(404).json({
          message: "Role Permission not found",
        });

        return;
      }

      await RolePermissionService.delete(rolePermission);

      res.status(204).send();

    } catch (error) {
      next(error);
    }
  }
}