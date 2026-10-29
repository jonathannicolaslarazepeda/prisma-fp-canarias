import { AuthToken } from "./auth-token.model.js";

export class AuthTokenService {

  static async findAll() {
    return AuthToken.findAll({
      order: [["id", "ASC"]],
    });
  }

  static async findById(id: number) {
    return AuthToken.findByPk(id);
  }


  static async create(data: {
    userId: number;
    tokenHash: string;
    tokenType: string;
    expiresAt?: Date;
  }) {
    return AuthToken.create(data);
  }


  static async update(
    authToken: AuthToken,
    data: {
      userId?: number;
      tokenHash?: string;
      tokenType?: string;
      expiresAt?: Date;
    }
  ) {
    return authToken.update(data);
  }


  static async delete(authToken: AuthToken) {
    await authToken.destroy();
  }
}
