import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from "sequelize";

import { sequelize } from "../../config/database.js";

export class StudentInterest extends Model<
  InferAttributes<StudentInterest>,
  InferCreationAttributes<StudentInterest>
> {
  declare id: CreationOptional<number>;

  declare studentId: number;

  declare name: string;

  declare description: string | null;

}

StudentInterest.init(
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

    name: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

  },
  {
    sequelize,

    modelName: "StudentInterest",

    tableName: "student-interests",

    timestamps: false,
  }
);
