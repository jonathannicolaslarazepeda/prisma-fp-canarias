import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  NonNullFindOptions,
} from "sequelize";

import { sequelize } from "../../config/database";

export class AuditLog extends Model<
  InferAttributes<AuditLog>,
  InferCreationAttributes<AuditLog >
> {
  declare id: CreationOptional<number>;

  declare userId: number;

  declare action: string;

  declare entityType: string;

  declare entityId: number;

  declare previousValues: CreationOptional<JSON | null>;

  declare newValues: CreationOptional<JSON | NonNullFindOptions>;

  declare createdAt: CreationOptional<Date>;

}

AuditLog.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },


    userId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },

    action: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },

    entityType: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },

    entityId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },

    previousValues: {
      type: DataTypes.JSON,
      allowNull: true,
    },

    newValues: {
      type: DataTypes.JSON,
      allowNull: true,
    },

    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },

  },
  {
    sequelize,

    tableName: "AuditLogs",

    timestamps: true,
    updatedAt: false,
  }
);  