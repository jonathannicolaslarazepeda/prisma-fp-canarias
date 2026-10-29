import { RolePermission } from "./role-permission.model.js";

export class RolePermissionService {

  static async findAll() {
    return RolePermission.findAll({
      order: [["id", "ASC"]],
    });
  }

  static async findById(id: number) {
    return RolePermission.findByPk(id);
  }


  static async create(data: {
    roleId: number;
    permissionId: number;
  }) {
    return RolePermission.create(data);
  }


  static async update(
    rolePermission: RolePermission,
    data: {
      roleId?: number;
      permissionId?: number;
    }
  ) {
    return rolePermission.update(data);
  }



  static async delete(rolePermission: RolePermission) {
    await rolePermission.destroy();
  }
}
