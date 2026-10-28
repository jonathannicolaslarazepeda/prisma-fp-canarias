import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from "sequelize";

import { sequelize } from "../../config/database.js";

export class Consent extends Model<
  InferAttributes<Consent>,
  InferCreationAttributes<Consent>
> {
  declare id: CreationOptional<number>;

  declare studentId: number;

  declare consentRequestId: number | null;

  declare purpose: string;

  declare status: string;

  declare policyVersion: string;

  declare recordedAt: CreationOptional<Date>;

}

Consent.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },

    studentId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },

    consentRequestId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
    },

    purpose: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },

    status: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },

    policyVersion: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },

    recordedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },

  },
  {
    sequelize,

    modelName: "Consent",

    tableName: "consents",

    timestamps: false,
  }
);
