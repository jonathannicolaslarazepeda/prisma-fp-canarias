import { RoleUser } from "./role-user.model";
import { User } from "../users/user.model";
import { Role } from "../roles/role.model";

const includeRole = {
  model: Role,
  as: "role",
  attributes: ["id", "name", "description"],
};

const includeUser = {
  model: User,
  as: "user",
  attributes: ["id", "name", "email"],
};

export class RoleUserService {

  static async findAll() {
    return RoleUser.findAll({
      order: [["id", "ASC"]],
    });
  }


  static async findById(id: number) {
    return RoleUser.findByPk(id);
  }

  static async findAllEagerly() {
    return RoleUser.findAll({
      include: [includeRole, includeUser],
      order: [["id", "ASC"]],
    });
  }

  static async findEagerlyById(id: number) {
    return RoleUser.findByPk(id, {
      include: [includeRole, includeUser],
    });
  }

  static async create(data: {
    roleID: number;
    userID: number;
  }) {
    return RoleUser.create(data);
  }


  static async update(
    roleUser: RoleUser,
    data: {
      roleID?: number;
      userID?: number;
    }
  ) {
    return roleUser.update(data);
  }


  static async delete(roleUser: RoleUser) {
    await roleUser.destroy();
  }
}
