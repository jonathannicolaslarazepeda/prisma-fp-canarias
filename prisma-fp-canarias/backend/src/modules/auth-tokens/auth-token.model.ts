import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from "sequelize";

import { sequelize } from "../../config/database.js";

export class AuthToken extends Model<
  InferAttributes<AuthToken>,
  InferCreationAttributes<AuthToken >
> {
  declare id: CreationOptional<number>;

  declare userId: number;

  declare tokenHash: string;

  declare tokenType: string;

  declare expiresAt: CreationOptional<Date>;

  declare createdAt: CreationOptional<Date>;

  declare updatedAt: CreationOptional<Date>;

}

AuthToken.init(
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

    tokenHash: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },

    tokenType: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },

    expiresAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },

    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },

    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,

    tableName: "auth_tokens",

    timestamps: true,
  }
);  