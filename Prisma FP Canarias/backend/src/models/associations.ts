import { User } from "../modules/users/user.model";
import { Role } from "../modules/roles/role.model";
import { RoleUser } from "../modules/role-users/role-user.model";

export function defineAssociations() {
    User.hasMany(RoleUser, { foreignKey: "userID", as: "role" });
    RoleUser.belongsTo(User, { foreignKey: "userID", as: "user" });
    Role.hasMany(RoleUser, { foreignKey: "roleID", as: "roleUsers" });
    RoleUser.belongsTo(Role, { foreignKey: "roleID", as: "role" });
}
