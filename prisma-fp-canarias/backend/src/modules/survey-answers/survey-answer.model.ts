import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from "sequelize";

import { sequelize } from "../../config/database.js";

export class SurveyAnswer extends Model<
  InferAttributes<SurveyAnswer>,
  InferCreationAttributes<SurveyAnswer>
> {
  declare id: CreationOptional<number>;

  declare invitationId: number;

  declare questionId: number;

  declare answerValue: string;

  declare answeredAt: CreationOptional<Date>;
}

SurveyAnswer.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },

    invitationId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },

    questionId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },

    answerValue: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    answeredAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,

    modelName: "SurveyAnswer",

    tableName: "survey_answers",

    timestamps: false,
  }
);
