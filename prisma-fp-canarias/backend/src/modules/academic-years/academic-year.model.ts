
import {
    Model,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
} from "sequelize";

import { sequelize } from "../../config/database.js";

export class academicYear extends Model<
    InferAttributes<academicYear>,
    InferCreationAttributes<academicYear>
> {
    declare id: CreationOptional<number>;

    declare name: string;

    declare startDate: Date;

    declare endDate: Date;
    
    declare isActive: CreationOptional<boolean>;
}

academicYear.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        startDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        endDate: {
            type: DataTypes.DATE,
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
        tableName: "academic_years",
        modelName: "academicYear",
        timestamps: true,
    }
);
