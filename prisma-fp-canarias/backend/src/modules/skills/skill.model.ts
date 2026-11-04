import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from "sequelize";

import { sequelize } from "../../config/database.js";

export class Skill extends Model<
  InferAttributes<Skill>,
  InferCreationAttributes<Skill>
> {
  declare id: CreationOptional<number>;

  declare name: string;

  declare category: string;

  declare description: string | null;

}

Skill.init(
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

    category: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

  },
  {
    sequelize,

    modelName: "Skill",

    tableName: "skills",

    timestamps: false,
  }
);
