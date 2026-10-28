import { Request, Response, NextFunction } from "express";
import { RoleUserService } from "./role-user.service.js";

export class RoleUserController {

  static async getAll(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const roleUsers = await RoleUserService.findAll();

      res.json(roleUsers);
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

      const roleUser = await RoleUserService.findById(id);

      if (!roleUser) {
        res.status(404).json({
          message: "Role user not found",
        });

        return;
      }

      res.json(roleUser);

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
      const roleUsers = await RoleUserService.findAllEagerly();

      res.json(roleUsers);
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

      const roleUser = await RoleUserService.findEagerlyById(id);

      if (!roleUser) {
        res.status(404).json({
          message: "Role user not found",
        });

        return;
      }

      res.json(roleUser);

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
      const { roleID, userID } = req.body;

      if (!roleID || !userID) {
        res.status(400).json({
          message: "roleID and userID are required",
        });

        return;
      }

      const roleUser = await RoleUserService.create({
        roleID,
        userID
      });

      res.status(201).json(roleUser);

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

      const roleUser = await RoleUserService.findById(id);

      if (!roleUser) {
        res.status(404).json({
          message: "Role user not found",
        });

        return;
      }

      const updatedRoleUser = await RoleUserService.update(
        roleUser,
        req.body
      );

      res.json(updatedRoleUser);

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

      const roleUser = await RoleUserService.findById(id);

      if (!roleUser) {
        res.status(404).json({
          message: "Role user not found",
        });

        return;
      }

      await RoleUserService.delete(roleUser);

      res.status(204).send();

    } catch (error) {
      next(error);
    }
  }
}
