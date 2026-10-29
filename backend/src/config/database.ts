<<<<<<< HEAD
import { Dialect, Sequelize } from "sequelize";
import { env } from "./env.js";
=======
import { Sequelize } from "sequelize";
import { env } from "./env";
>>>>>>> develop

export const sequelize = new Sequelize(
  env.DB_NAME,
  env.DB_USER,
  env.DB_PASSWORD,
  {
    host: env.DB_HOST,
    port: env.DB_PORT,
<<<<<<< HEAD
    dialect: env.DB_DIALECT as Dialect,
    define:  {
      underscored: true,
      freezeTableName: false,
    },
    logging: 
      env.NODE_ENV === "development"
      ? console.log
      : false,
=======
    dialect: "mysql",
    logging: false,
>>>>>>> develop
  }
);