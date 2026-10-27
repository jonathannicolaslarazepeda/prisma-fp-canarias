import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from "sequelize";

import { sequelize } from "../../config/database";

export class StudentSkill extends Model<
  InferAttributes<StudentSkill>,
  InferCreationAttributes<StudentSkill>
> {
  declare studentId: number;

  declare skillId: number;

  declare proficiencyLevel: string;

  declare updatedAt: CreationOptional<Date>;
}

StudentSkill.init(
  {
    studentId: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      allowNull: false,
    },

    skillId: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      allowNull: false,
    },

    proficiencyLevel: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },

    updatedAt: DataTypes.DATE,
  },
  {
    sequelize,

    modelName: "StudentSkill",

    tableName: "student-skills",

    timestamps: true,

    createdAt: false,
  }
);
