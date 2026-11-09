import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from "sequelize";

import { sequelize } from "../../config/database.js";

export class Survey extends Model<
  InferAttributes<Survey>,
  InferCreationAttributes<Survey>
> {
  declare id: CreationOptional<number>;

  declare title: string;

  declare description: string | null;

  declare isActive: CreationOptional<boolean>;

  declare createdAt: CreationOptional<Date>;
}

Survey.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },

    title: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },

    createdAt: DataTypes.DATE,
  },
  {
    sequelize,

    modelName: "Survey",

    tableName: "surveys",

    timestamps: true,

    updatedAt: false,
  }
);
