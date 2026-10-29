import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from "sequelize";

import { sequelize } from "../../config/database.js";

export class studentEnrollment extends Model<
  InferAttributes<studentEnrollment>,
  InferCreationAttributes<studentEnrollment>
> {
  declare id: CreationOptional<number>;

  declare studentId: number;

  declare programId: number;

  declare academicYearId: number;

  declare enrollmentDate: Date;

  declare graduationDate: Date | null;

  declare status: string;
}

studentEnrollment.init(
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
    programId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    academicYearId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    enrollmentDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    graduationDate: {

      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "student_enrollments",
    modelName: "studentEnrollment",
    timestamps: true,
  }
);