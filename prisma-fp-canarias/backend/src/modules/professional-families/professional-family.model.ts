import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from "sequelize";

import { sequelize } from "../../config/database";

export class professionalFamily extends Model<
  InferAttributes<professionalFamily>,
  InferCreationAttributes<professionalFamily>
> {

  declare id: CreationOptional<number>;

  declare name: string;

  declare code: string;

  declare description: string | null;
}
professionalFamily.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(150),
      allowNull: false,
      unique: true,
    },
    code: {
      type: DataTypes.STRING(40),
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "professional_families",
    modelName: "professionalFamily",
    timestamps: true,
  } 
);