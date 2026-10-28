import { Request, Response, NextFunction } from "express";
import { AuthTokenService } from "./auth-token.service.js";

export class AuthTokenController {

  static async getAll(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const authTokens = await AuthTokenService.findAll();

      res.json(authTokens);
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

      const authToken = await AuthTokenService.findById(id);

      if (!authToken) {
        res.status(404).json({
          message: "Auth token not found",
        });

        return;
      }

      res.json(authToken);

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
      const { userId, tokenHash, tokenType, expiresAt } = req.body;

      if (!userId || !tokenHash || !tokenType) {
        res.status(400).json({
          message: "userId, tokenHash, and tokenType are required",
        });

        return;
      }

      const authToken = await AuthTokenService.create({
        userId,
        tokenHash,
        tokenType,
        expiresAt,
      });

      res.status(201).json(authToken);

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

      const authToken = await AuthTokenService.findById(id);

      if (!authToken) {
        res.status(404).json({
          message: "Auth token not found",
        });

        return;
      }

      const updatedAuthToken = await AuthTokenService.update(
        authToken,
        req.body
      );

      res.json(updatedAuthToken);

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

      const authToken = await AuthTokenService.findById(id);

      if (!authToken) {
        res.status(404).json({
          message: "Auth token not found",
        });

        return;
      }

      await AuthTokenService.delete(authToken);

      res.status(204).send();

    } catch (error) {
      next(error);
    }
  }
}