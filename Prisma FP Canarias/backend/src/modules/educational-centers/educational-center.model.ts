import {
    Model,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
  } from "sequelize";

  import { sequelize } from "../../config/database";

  export class educationalCenter extends Model<
    InferAttributes<educationalCenter>,
    InferCreationAttributes<educationalCenter>
  > {
    declare id: CreationOptional<number>;

    declare name: string;

    declare code: string;  

    declare logoUrl: string;

    declare address: string;

    declare isActive: boolean;

}

educationalCenter.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            unique: true,
        },
        code: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true,
        },
        logoUrl: {
            type: DataTypes.STRING(255),
            allowNull: false,

        },
        address: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        },
        
    },
    {
        sequelize, tableName: "educational_centers", modelName: "educationalCenter", timestamps: true,
    }
);
