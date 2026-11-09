import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from "sequelize";

import { sequelize } from "../../config/database.js";

export class EmploymentRecord extends Model<
  InferAttributes<EmploymentRecord>,
  InferCreationAttributes<EmploymentRecord>
> {
  declare id: CreationOptional<number>;

  declare studentId: number;

  declare companyId: number;

  declare internshipId: number | null;

  declare position: string;

  declare sector: string | null;

  declare startDate: string;

  declare endDate: string | null;

  declare isRelatedToStudies: CreationOptional<boolean>;
}

EmploymentRecord.init(
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

    companyId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },

    internshipId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
    },

    position: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },

    sector: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },

    startDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },

    endDate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },

    isRelatedToStudies: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    sequelize,

    modelName: "EmploymentRecord",

    tableName: "employment_records",

    timestamps: false,
  }
);
