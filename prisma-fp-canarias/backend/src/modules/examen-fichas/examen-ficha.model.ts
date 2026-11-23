
import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from "sequelize";

import { sequelize } from "../../config/database.js";

export class examenFicha extends Model<
  InferAttributes<examenFicha>,
  InferCreationAttributes<examenFicha>
> {
  declare id: CreationOptional<number>;

  declare educationalCenterId: number;

  declare description: string;

  declare operation: CreationOptional<
    "CREATE" | "MODIFY" | "READ" | null
  >;
}

examenFicha.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    educationalCenterId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      field: "educational_center_id",
      references: {
        model: "educational_centers",
        key: "id",
      },
    },

    description: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },

    operation: {
      type: DataTypes.ENUM("CREATE", "MODIFY", "READ"),
      allowNull: true,
      defaultValue: null,
    },
  },
  {
    sequelize,
    tableName: "examen_fichas",
    modelName: "examenFicha",
    timestamps: true,
    underscored: true,
  }
);
