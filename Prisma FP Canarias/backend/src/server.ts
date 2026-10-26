import { app } from "./app";
import { sequelize } from "./config/database";
import { env } from "./config/env";
import { defineAssociations } from "./models/associations";

import "./modules/companies/company.model";
import "./modules/internships/internship.model";
import "./modules/employment-records/employment-record.model";
import "./modules/surveys/survey.model";
import "./modules/survey-questions/survey-question.model";
import "./modules/survey-invitations/survey-invitation.model";
import "./modules/survey-answers/survey-answer.model";

async function startServer() {
  try {

    defineAssociations();

    await sequelize.authenticate();

    console.log("Conexión con MySQL establecida.");

    await sequelize.sync();

    console.log("Modelos sincronizados.");

    app.listen(env.PORT, () => {
      console.log(
        `Servidor funcionando en http://localhost:${env.PORT}`
      );
    });

  } catch (error) {

    console.error(
      "No se pudo iniciar la aplicación:",
      error
    );

    process.exit(1);
  }
}

startServer();
