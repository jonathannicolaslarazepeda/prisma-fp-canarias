import { User } from "../modules/users/user.model.js";
import { Role } from "../modules/roles/role.model.js";
import { Permission } from "../modules/permissions/permission.model.js";
import { RoleUser } from "../modules/role-users/role-user.model.js";
import { RolePermission } from "../modules/role-permissions/role-permission.model.js";
import { AuthToken } from "../modules/auth-tokens/auth-token.model.js";



export function defineAssociations() {

    // =========================
    // USER <-> USER ROLE
    // =========================

    User.hasMany(RoleUser, {foreignKey: "userId", as: "roleUsers"});
    RoleUser.belongsTo(User, {foreignKey: "userId", as: "user"});


    // =========================
    // ROLE <-> USER ROLE
    // =========================

    Role.hasMany(RoleUser, {foreignKey: "roleId", as: "roleUsers"});
    RoleUser.belongsTo(Role, {foreignKey: "roleId", as: "role"});


    // =========================
    // ROLE <-> ROLE PERMISSION
    // =========================

    Role.hasMany(RolePermission, {foreignKey: "roleId", as: "rolePermissions"});
    RolePermission.belongsTo(Role, {foreignKey: "roleId", as: "role"});


    // =========================
    // PERMISSION <-> ROLE PERMISSION
    // =========================

    Permission.hasMany(RolePermission, {foreignKey: "permissionId", as: "rolePermissions",});
    RolePermission.belongsTo(Permission, {foreignKey: "permissionId", as: "permission",});


    // =========================
    // USER <-> AUTH TOKEN
    // =========================

    User.hasMany(AuthToken, {foreignKey: "userId", as: "authTokens"});
    AuthToken.belongsTo(User, {foreignKey: "userId", as: "user"});


    // =========================
    // MANY-TO-MANY
    // =========================

    User.belongsToMany(Role, {through: RoleUser, foreignKey: "userId", otherKey: "roleId", as: "roles"});
    Role.belongsToMany(User, {through: RoleUser, foreignKey: "roleId", otherKey: "userId", as: "users"});
    Role.belongsToMany(Permission, {through: RolePermission, foreignKey: "roleId", otherKey: "permissionId", as: "permissions"});
    Permission.belongsToMany(Role, {through: RolePermission, foreignKey: "permissionId", otherKey: "roleId", as: "roles"});
};