import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from "sequelize";

import { sequelize } from "../../config/database";

export class RolePermission extends Model<
  InferAttributes<RolePermission>,
  InferCreationAttributes<RolePermission>
> {
  declare id: CreationOptional<number>;

  declare roleId: number;

  declare permissionId: number;

}

RolePermission.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },


    roleId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },

    permissionId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false, 
    },
  
  },
  {
    sequelize,

    tableName: "role_permissions",

    timestamps: true,
  }
);  