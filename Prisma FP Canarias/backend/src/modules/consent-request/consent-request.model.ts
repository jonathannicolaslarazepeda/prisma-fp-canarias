import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from "sequelize";

import { sequelize } from "../../config/database";

export class ConsentRequest extends Model<
  InferAttributes<ConsentRequest>,
  InferCreationAttributes<ConsentRequest>
> {
  declare id: CreationOptional<number>;

  declare studentId: number;

  declare sentById: number;

  declare tokenHash: string;

  declare sentAt: CreationOptional<Date>;

  declare expiresAt: Date;

  declare usedAt: Date | null;

}

ConsentRequest.init(
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

    sentById: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },

    tokenHash: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },

    sentAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },

    expiresAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },

    usedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },

  },
  {
    sequelize,

    modelName: "ConsentRequest",

    tableName: "consent-requests",

    timestamps: false,
  }
);
