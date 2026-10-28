import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from "sequelize";

import { sequelize } from "../../config/database";

export class tutorAssignment extends Model<
  InferAttributes<tutorAssignment>,
  InferCreationAttributes<tutorAssignment>
> {
  declare id: CreationOptional<number>;

  declare tutorId: number;

  declare programId: number;

  declare academicYearId: number;

  declare assignedAt: CreationOptional<Date>;
}
tutorAssignment.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    tutorId: {
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
    assignedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: "tutor_assignments",
    modelName: "tutorAssignment",
    timestamps: true,
  }
);