
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { User } from "./user.model.js";
import { Role } from "../rbac/role.model.js";
import { RoleUser } from "../rbac/role-user.model.js";
import { sequelize } from "../../config/database.js";
import { env } from "../../config/env.js";

export class AuthService {
  static async validateCredentials(
    email: string,
    password: string
  ): Promise<User | null> {
    const user = await User.findOne({
      where: { email }
    });

    if (!user) {
      return null;
    }

    const validPassword = await bcrypt.compare(
      password,
      String(user.passwordHash)
    );

    if (!validPassword) {
      return null;
    }

    return user;
  }

  static async register(
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ): Promise<User> {
    return sequelize.transaction(async (transaction) => {
      const existingUser = await User.findOne({
        where: { email },
        transaction
      });

      if (existingUser) {
        throw new Error("EMAIL_ALREADY_EXISTS");
      }

      const passwordHash = await bcrypt.hash(password, 12);

      const userRole = await Role.findOne({
        where: { name: "User" },
        transaction
      });

      if (!userRole) {
        throw new Error("User role not found");
      }

      const user = await User.create(
        {
          email,
          passwordHash,
          firstName,
          lastName
        },
        { transaction }
      );

      await RoleUser.create(
        {
          userID: user.id,
          roleID: userRole.id
        },
        { transaction }
      );

      return user;
    });
  }

  static async generateToken(
    userId: number
  ): Promise<string | null> {
    const secret = env.JWT_SECRET;

    if (!secret) {
      throw new Error("JWT_SECRET not configured");
    }

    const token = jwt.sign({}, secret, {
      algorithm: "HS256",
      subject: String(userId),
      expiresIn: "1h",
      issuer: "prisma-fp-canarias-api",
      audience: "prisma-fp-canarias-client"
    });

    return token;
  }
}
