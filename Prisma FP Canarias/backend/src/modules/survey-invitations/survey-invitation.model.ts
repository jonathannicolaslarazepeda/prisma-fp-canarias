import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from "sequelize";

import { sequelize } from "../../config/database";

export class SurveyInvitation extends Model<
  InferAttributes<SurveyInvitation>,
  InferCreationAttributes<SurveyInvitation>
> {
  declare id: CreationOptional<number>;

  declare surveyId: number;

  declare studentId: number;

  declare tokenHash: string;

  declare sentAt: CreationOptional<Date>;

  declare expiresAt: Date;

  declare completedAt: Date | null;
}

SurveyInvitation.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },

    surveyId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },

    // FK a Student (módulo pendiente).
    studentId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },

    tokenHash: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },

    sentAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },

    expiresAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },

    completedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,

    modelName: "SurveyInvitation",

    tableName: "survey-invitations",

    timestamps: false,
  }
);
