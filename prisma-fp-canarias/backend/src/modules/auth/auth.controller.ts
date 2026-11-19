
import { Request, Response, NextFunction } from "express";
import { AuthService } from "./auth.service.js";

export class AuthController {
  static async login(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { email, password } = res.locals.authUser;

      if (!email || !password) {
        res.status(400).json({
          message: "Email and Password are required"
        });
        return;
      }

      const user = await AuthService.validateCredentials(
        email,
        password
      );

      if (!user) {
        res.status(401).json({
          message: "Non valid credentials"
        });
        return;
      }

      const token = await AuthService.generateToken(user.id);

      res.status(200).json({
        message: "Auth OK",
        token,
        tokenType: "Bearer",
        expiresIn: 3600
      });
    } catch (error) {
      res.status(500).json({
        message: error
      });
    }
  }

  static async register(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { email, password } = res.locals.authUser;
      const { firstName, lastName } = req.body;

      if (!email || !password || !firstName || !lastName) {
        res.status(400).json({
          message: "Email, Password, FirstName and LastName are required"
        });
        return;
      }

      const user = await AuthService.register(
        email,
        password,
        firstName,
        lastName
      );

      const token = await AuthService.generateToken(user.id);

      res.status(200).json({
        message: "Auth OK",
        token,
        tokenType: "Bearer",
        expiresIn: 3600
      });
    } catch (error) {
      res.status(500).json({
        message: error
      });
    }
  }
}
