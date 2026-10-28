import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from "sequelize";

import { sequelize } from "../../config/database";

export class SurveyQuestion extends Model<
  InferAttributes<SurveyQuestion>,
  InferCreationAttributes<SurveyQuestion>
> {
  declare id: CreationOptional<number>;

  declare surveyId: number;

  declare questionText: string;

  declare questionType: string;

  declare sortOrder: number;

  declare isRequired: CreationOptional<boolean>;
}

SurveyQuestion.init(
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

    questionText: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },

    questionType: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },

    sortOrder: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },

    isRequired: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    sequelize,

    modelName: "SurveyQuestion",

    tableName: "survey-questions",

    timestamps: false,
  }
);
