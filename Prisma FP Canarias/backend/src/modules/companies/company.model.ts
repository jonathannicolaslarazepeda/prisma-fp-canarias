import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from "sequelize";

import { sequelize } from "../../config/database";

export class Company extends Model<
  InferAttributes<Company>,
  InferCreationAttributes<Company>
> {
  declare id: CreationOptional<number>;

  declare taxId: string;

  declare name: string;

  declare sector: string | null;

  declare city: string | null;

  declare contactEmail: string | null;

  declare contactPhone: string | null;
}

Company.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },

    taxId: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true,
    },

    name: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },

    sector: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },

    city: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },

    contactEmail: {
      type: DataTypes.STRING(150),
      allowNull: true,
    },

    contactPhone: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },
  },
  {
    sequelize,

    modelName: "Company",

    tableName: "companies",

    timestamps: false,
  }
);
