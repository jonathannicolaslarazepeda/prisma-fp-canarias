import {
    Model,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional
} from "sequelize";

import { sequelize } from "../../config/database";

export class RoleUser extends Model<
InferAttributes<RoleUser>,
InferCreationAttributes<RoleUser>
> {
    declare id: CreationOptional<number>;
    declare roleID: number;
    declare userID: number;
    declare assignedAt: CreationOptional<Date>;
}

RoleUser.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        roleID: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        userID: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        assignedAt: DataTypes.DATE,
    },
    {
        sequelize,
        tableName: "role_users", modelName: "RoleUser", timestamps: true
    }
);