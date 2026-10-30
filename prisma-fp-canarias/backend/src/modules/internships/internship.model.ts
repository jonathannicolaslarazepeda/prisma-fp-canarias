import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from "sequelize";

import { sequelize } from "../../config/database.js";

export class Internship extends Model<
  InferAttributes<Internship>,
  InferCreationAttributes<Internship>
> {
  declare id: CreationOptional<number>;

  declare enrollmentId: number;

  declare companyId: number;

  declare startDate: string;

  declare endDate: string | null;

  declare wasHired: CreationOptional<boolean>;

  declare hiringDate: string | null;
}

Internship.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },

    enrollmentId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },

    companyId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },

    startDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },

    endDate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },

    wasHired: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },

    hiringDate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
  },
  {
    sequelize,

    modelName: "Internship",

    tableName: "internships",

    timestamps: false,
  }
);
