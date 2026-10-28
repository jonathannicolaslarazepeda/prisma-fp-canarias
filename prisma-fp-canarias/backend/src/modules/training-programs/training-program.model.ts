import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from "sequelize";

import { sequelize } from "../../config/database";

export class trainingProgram extends Model<
  InferAttributes<trainingProgram>,
  InferCreationAttributes<trainingProgram>
> {
  declare id: CreationOptional<number>;

  declare familyId: number;

  declare centerId: number;

  declare name: string;

  declare code: string;

  declare level: string;

  declare isActive: CreationOptional<boolean>;
}
trainingProgram.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    familyId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    centerId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    code: {
      type: DataTypes.STRING(40),
      allowNull: false,
    },
    level: {
      type: DataTypes.STRING(80),
      allowNull: false,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    sequelize,
    tableName: "training_programs",
    modelName: "trainingProgram",
    timestamps: true,
  }
);