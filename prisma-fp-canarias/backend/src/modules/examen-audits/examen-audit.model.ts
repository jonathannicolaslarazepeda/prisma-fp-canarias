
import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from "sequelize";

import { sequelize } from "../../config/database.js";

export class examenAudit extends Model<
  InferAttributes<examenAudit>,
  InferCreationAttributes<examenAudit>
> {
  declare id: CreationOptional<number>;

  declare educationalCenterId: number;

  declare description: string;

  declare operation: CreationOptional<"CREATE" | "MODIFY" | "READ" | null>;
}

examenAudit.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    educationalCenterId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "educational_centers", key: "id",
      },
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    operation: {
      type: DataTypes.ENUM("CREATE", "MODIFY", "READ"),
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "examen_audits",
    modelName: "examenAudit",
    timestamps: true,
  }
);
